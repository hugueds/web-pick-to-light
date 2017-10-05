import { Injectable, EventEmitter } from '@angular/core';
import { Device } from '../models/Device';
import { PickService } from '../services/pick.service';

import { DEVICE_EXAMPLE } from './../examples/device.example';

@Injectable()

export class DeviceService {

    private static device: Device = new Device();

    deviceUpdated = new EventEmitter<any>();

    constructor(private _pickService: PickService) {
        if (JSON.parse(localStorage.getItem('device'))) {
            DeviceService.device = JSON.parse(localStorage.getItem('device'));
        }
    }

    getDeviceInfo(): Device {
        return DeviceService.device;
    }

    registerDevice(device, cb) {
        this.unregisterDevice();
        console.log(`%c Registrando dispositivo ${JSON.stringify(device)}`, 'color: #5500ff');
        DeviceService.device.name = device.name;
        DeviceService.device.user = device.user;
        this._pickService.getConfiguration(device.name).subscribe(station => {
                if (station.idGroupStationVp) {
                    const stationId = station.idGroupStationVp.toString();
                    this._pickService.getGroup(stationId).subscribe(group => {
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
