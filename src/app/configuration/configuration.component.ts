import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { DeviceService } from "../services/device.service";
import { Device } from '../models/Device';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  devices: string[] = [];
  user: string = ''
  selectedDevice: any = {};
  device: Device;
  stations: any[];


  constructor(private _deviceService: DeviceService, private _router: Router) {    
    this.generateTabletList();
  }

  ngOnInit() {
    this.device = this._deviceService.getDeviceInfo() || new Device();        
    this.selectedDevice.name = this.device.name || this.devices[0];
    this.selectedDevice.user = this.device.user || '';
  }

  saveChanges() {

    if (this.selectedDevice.name == '') {
      console.log('DISPOSITIVO NÃO FOI SELECIONADO');
      return;
    }

    if (this.selectedDevice.user == undefined || this.selectedDevice.user == '') {
      console.log('%c USUÁRIO NÃO FOI SELECIONADO', 'background-color: yellow;');
      return;
    }

    this._deviceService.registerDevice(this.selectedDevice, () => {
      this._router.navigate(['']);
    });


  }

  generateTabletList() {
    for (let i = 1; i <= 10; i++) {
      if (i < 10) {
        this.devices.push('TABLET0' + i);
      }
      else {
        this.devices.push('TABLET' + i);
      }
    }
  }
  

  unregisterDevice(){
    this.selectedDevice.user = '';
    this._deviceService.unregisterDevice();
  }

  changeStation(station, index){
    localStorage.setItem('currentStationId', JSON.stringify(station));
    localStorage.setItem('currentStationSequence', JSON.stringify(index));
    return true;
  }


}

