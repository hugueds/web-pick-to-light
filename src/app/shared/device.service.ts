import { Injectable, EventEmitter } from '@angular/core';
import { Device } from "app/models/Device";
import { PickService } from "app/shared/pick.service";


@Injectable()

export class DeviceService{

    public static device:Device;

    tabletUpdatedEvent = new EventEmitter<boolean>();

    constructor( private _pickService:PickService ){        
        if (JSON.parse(localStorage.getItem('device'))){
            DeviceService.device = JSON.parse(localStorage.getItem('device'));            
        }
        else{
            DeviceService.device = new Device();                
        }
    }

    getDeviceInfo(){
        return DeviceService.device;
    }  
    

    registerDevice( device ){
        DeviceService.device.name = device.name; 
        DeviceService.device.user = device.user;
        this._pickService.getConfiguration(device.name).subscribe( station => {            
            let stationId = station.idGroupStationVp.toString();
            this._pickService.getGroup(stationId).subscribe( group => {
                DeviceService.device.deviceModel = navigator.userAgent.match(/\((\w.+);/)[1].replace(';', '-');
                DeviceService.device.groupId = group.id;
                DeviceService.device.groupName = group.name;
                DeviceService.device.stations = group.stations.map( s => s.idStation);
                DeviceService.device.isRegistered = true;
                localStorage.setItem('device', JSON.stringify(DeviceService.device));
                this.tabletUpdatedEvent.emit(true);
            })            
        })
    }

    unregisterDevice() {
        localStorage.removeItem('device');
    }

    updateLastLogin(){

    }

    updateUser(){

    }

    updateDeviceInfo(){

    }




    



}