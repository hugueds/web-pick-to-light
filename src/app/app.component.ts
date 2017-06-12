import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { PickService } from "app/shared/pick.service";
import { SockService } from 'app/shared/sock.service';
import * as io from 'socket.io-client';
import { Log } from "app/models/log";
import { DeviceService } from "app/shared/device.service";
import { Device } from "app/models/Device";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PickService]
})

export class AppComponent implements OnInit {  

  device:Device;
  functions: Array<any>;
  myData: Array<any>;
  wagon: any = {};  
  currentItem: number = 0;    
  currentStationId = 0;
  errorMessage: any;
  log: Log;
  lastWagon: any = 'Nenhum';
  orientation: string = 'horizontal';


  constructor(private _pickService: PickService,
              // private _sock:SockService,
              private _deviceService:DeviceService) { }

  ngOnInit() {         
    this.registerDevice();
  }

  getWagons( stationId ) {
    // this._PickService.getTestWagons().then((wagon) => this.wagon = wagon); // Static Tests
    this._pickService.getWagon(stationId).subscribe( wagon =>   this.wagon = wagon , error => this.errorMessage = <any>error);
  }

  getItems() {
    // this._PickService.getTestItems().then((items) => this.items = items); // Static Tests
  }    

  registerDevice(){
    this._deviceService.registerDevice( { name : 'TABLET01', user: 'SSBHPE'} ); //testing
    this._deviceService.tabletUpdatedEvent.subscribe( e => {
      this.device = this._deviceService.getDeviceInfo();
      this.getWagons(this.device.stations[this.currentStationId])      
    })    
  }

  addItem(){
    if (this.currentItem < this.wagon.items.length - 1){
      this.currentItem++;
    }
  }

  reset(){
    this.currentItem = 0;
  }

  finish(){    
    this.log = new Log(this.wagon.wagonId, this.device.user, 'ANGULAR TESTE');
    console.log(this.log);
    this._pickService.finishWagon(this.log).subscribe( data => {
      this.lastWagon = data.wagon;
      localStorage.setItem('lastWagon', this.lastWagon);      
      this.wagon = {}; //Guardar no localstorage
      setTimeout( () => {
        this.getWagons(this.device.stations[this.currentStationId]);
        this.currentItem = 0;
      }, 2000);      
    });
    this.currentItem = 0;    
  }

  changeOrientation(){            
    return this.orientation = this.orientation ==  'horizontal' ? 'vertical' : 'horizontal';
  }

  
  ngOnChange() {
  
  }

}
