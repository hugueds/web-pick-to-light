import { Injectable, EventEmitter } from '@angular/core';
import { Device } from '../models/Device';
import { PickService } from '../services/pick.service';

import { DEVICE_EXAMPLE } from './../examples/device.example';

@Injectable()

export class DeviceService {

    private static device: Device = new Device();
    public deviceList: string[];

    deviceUpdated = new EventEmitter<any>();

    constructor(private _pickService: PickService) {

        if (JSON.parse(localStorage.getItem('device'))) {
            DeviceService.device = JSON.parse(localStorage.getItem('device'));
        }

        // Criar um serviço para salvar os dados e buscar via API
        this.deviceList = ['60', '61', '62', '63', '64', '65', '66',
            '67', '68', '69', '70', '963', '964', '965', '966', '967',
            '1110', '1111', '1112', '1132', '1131', '1134'];
    }

    getDeviceInfo(): Device {
        return DeviceService.device;
    }

    registerDevice(device, cb) {
        this.unregisterDevice();
        console.log(`%c Registrando dispositivo ${JSON.stringify(device)}`, 'color: #5500ff');
        DeviceService.device.name = device.name;
        DeviceService.device.user = device.user;
        this._pickService.getConfiguration(device.name).subscribe((station: any) => {
            if (station.idGroupStationVp) {
                const stationId = station.idGroupStationVp.toString();
                this._pickService.getGroup(stationId).subscribe((group: any) => {
                    DeviceService.device.deviceModel = navigator.userAgent.match(/\((\w.+);/)[1].replace(';', '-');
                    DeviceService.device.groupId = group.id;
                    DeviceService.device.groupName = group.name;
                    DeviceService.device.stations = group.stations.map(s => s.idStation);
                    DeviceService.device.currentStation = 0;
                    DeviceService.device.isRegistered = true;
                    localStorage.setItem('device', JSON.stringify(DeviceService.device));
                    this.deviceUpdated.emit('registered');
                    cb();
                });
            }
        }, error => {
            console.error(error);
        });
    }

    unregisterDevice() {
        localStorage.removeItem('device');
        DeviceService.device.isRegistered = false;
        console.log('%c Dados do dispositivo foram reiniciados', 'color: #ff0000');
        this.deviceUpdated.emit('unregistered');
    }

    updateLastLogin() {

    }

    updateUser() {

    }

    updateDeviceInfo() {

    }








}
