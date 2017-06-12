import { Injectable, EventEmitter } from '@angular/core';
import { Device } from "app/models/Device";
import { PickService } from "app/shared/pick.service";


@Injectable()

export class DeviceService{

    private device:Device;

    tabletUpdatedEvent = new EventEmitter<boolean>();

    constructor( private _pickService:PickService ){        
        if (JSON.parse(localStorage.getItem('device'))){
            this.device = JSON.parse(localStorage.getItem('device'));            
        }
        else{
            this.device = new Device();                
        }
    }

    getDeviceInfo(){
        return this.device;
    }  
    

    registerDevice( device ){
        this.device.name = device.name; 
        this.device.user = device.user;
        this._pickService.getConfiguration(device.name).subscribe( station => {            
            let stationId = station.idGroupStationVp.toString();
            this._pickService.getGroup(stationId).subscribe( group => {
                this.device.deviceModel = navigator.userAgent.match(/\((\w.+);/)[1].replace(';', '-');
                this.device.groupId = group.id;
                this.device.groupName = group.name;
                this.device.stations = group.stations.map( s => s.idStation);
                this.device.isRegistered = true;
                localStorage.setItem('device', JSON.stringify(this.device));
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