import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { SockService } from 'app/shared/sock.service';

import * as io from 'socket.io-client';

import { Log } from "app/models/Log";
import { DeviceService } from "app/shared/device.service";
import { Device } from "app/models/Device";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})

export class AppComponent implements OnInit {  

  device:Device;

  constructor(private _deviceService: DeviceService){}
  
  ngOnInit(){
    this.setDevMode(); //Coment on production
    this.registerDevice();
  }

  registerDevice(){
    this._deviceService.registerDevice( { name : 'TABLET01', user: 'SSBHPE'} ); //testing
    this._deviceService.tabletUpdatedEvent.subscribe( e => {
      this.device = this._deviceService.getDeviceInfo();          
    })    
  }

  setDevMode(){
    localStorage.setItem('development', 'true');
  }

}
