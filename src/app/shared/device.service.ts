import { Injectable, EventEmitter } from '@angular/core';
import { Device } from "app/models/Device";
import { PickService } from "app/shared/pick.service";

import { DEVICE_EXAMPLE } from './../examples/device.example';

@Injectable()

export class DeviceService {

    private static device: Device = new Device();

    tabletUpdatedEvent = new EventEmitter<boolean>();

    constructor(private _pickService: PickService) {
        if (JSON.parse(localStorage.getItem('device'))) {
            DeviceService.device = JSON.parse(localStorage.getItem('device'));
        }
    }

    getDeviceInfo(): Device {
        return DeviceService.device;
        // return Promise.resolve(DeviceService.device); 
    }

    registerDevice(device, cb) {
        this.unregisterDevice();
        console.log('Registering the device');
        if (localStorage.getItem('development') == 'true') {
            DeviceService.device = DEVICE_EXAMPLE;
            DeviceService.device.isRegistered = true;
            localStorage.setItem('device', JSON.stringify(DeviceService.device));
            this.tabletUpdatedEvent.emit(true);
            return;
        }
        DeviceService.device.name = device.name;
        DeviceService.device.user = device.user;
        this._pickService.getConfiguration(device.name)
            .subscribe(station => {
                if (station.idGroupStationVp) {
                    let stationId = station.idGroupStationVp.toString();
                    this._pickService.getGroup(stationId).subscribe(group => {
                        DeviceService.device.deviceModel = navigator.userAgent.match(/\((\w.+);/)[1].replace(';', '-');
                        DeviceService.device.groupId = group.id;
                        DeviceService.device.groupName = group.name;
                        DeviceService.device.stations = group.stations.map(s => s.idStation);
                        DeviceService.device.isRegistered = true;
                        localStorage.setItem('device', JSON.stringify(DeviceService.device));
                        this.tabletUpdatedEvent.emit(true);
                        cb();
                    })
                }
            }, error => {
                console.error(error);
            })
    }

    unregisterDevice() {
        localStorage.removeItem('device');
        DeviceService.device.isRegistered = false;
    }

    updateLastLogin() {

    }

    updateUser() {

    }

    updateDeviceInfo() {

    }








}