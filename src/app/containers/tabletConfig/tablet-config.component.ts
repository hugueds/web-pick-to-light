import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DeviceService } from '../../services/device.service';
import { Device } from '../../models/Device';

@Component({
  selector: 'app-configuration',
  templateUrl: './tablet-config.component.html',
  styleUrls: ['./tablet-config.component.css']
})
export class TabletConfigComponent implements OnInit {

  devices: any[];
  user: String = '';
  selectedDevice: any = {};
  device: Device;
  stations: any[];
  deviceNotFound = false;
  selectedStation: number;


  constructor(private _deviceService: DeviceService, private _router: Router) {
    this.generateTabletList();
  }

  ngOnInit() {
    this.device = this._deviceService.getDeviceInfo() || new Device();
    this.selectedDevice.name = this.device.name || this.devices[0];
    this.selectedDevice.user = this.device.user || '';
    this.selectedStation = +localStorage.getItem('currentStationId');
  }

  saveChanges() {

    if (this.selectedDevice.name === '') {
      console.log('DISPOSITIVO NÃO FOI SELECIONADO');
      return;
    }

    if (this.selectedDevice.user === undefined || this.selectedDevice.user === '') {
      console.log('%c USUÁRIO NÃO FOI SELECIONADO', 'background-color: yellow;');
      return;
    }

    this._deviceService.registerDevice(this.selectedDevice, (err, status) => {
      if (err) {
        console.error(err);
        return;
      }
      if (status) {
        // localStorage.setItem('currentStationSequence', '0');
        this._router.navigate(['']);
      } else {
        this.deviceNotFound = true;
      }
    });


  }

  generateTabletList() {
    this._deviceService.getDevices().then(res => this.devices = res);
    // for (let i = 0; i < tabletList.length; i++) {
    //   this.devices.push('TABLET' + tabletList[i]);
    // }
    // this.devices.push('SPARE_BOX');
    return true;
  }


  unregisterDevice() {
    this.selectedDevice.user = '';
    this._deviceService.unregisterDevice();
  }

  changeStation(station, index) {
    localStorage.setItem('currentStationId', JSON.stringify(station));
    localStorage.setItem('currentStationSequence', JSON.stringify(index));
    this.selectedStation = station;
    return true;
  }


}

