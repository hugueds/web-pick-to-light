import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import * as io from 'socket.io-client';

import { Log } from "./models/Log";

import { SockService } from './services/sock.service';
import { DeviceService } from "./services/device.service";
import { Device } from "./models/Device";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})

export class AppComponent implements OnInit {

  device: Device;

  constructor(private _deviceService: DeviceService) { }

  ngOnInit() {    
    //this.device = this._deviceService.getDeviceInfo();
  }  

}
