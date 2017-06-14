import { WAGON_EXAMPLE } from './../examples/wagon.example';
import { Component, OnInit } from '@angular/core';
import { PickService } from "app/shared/pick.service";
import { Log } from "app/models/Log";
import { DeviceService } from "app/shared/device.service";
import { Device } from "app/models/Device";

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  device: Device;
  wagon: any;  
  currentItem: number = 0;    
  currentStationId = 0;
  errorMessage: any;
  log: Log;
  lastWagon: any = 'Nenhum';
  orientation: string = 'horizontal';

  constructor(
    private _pickService: PickService,
    private _deviceService: DeviceService) {
      this.device = _deviceService.getDeviceInfo();
    }

  ngOnInit() {
    if (localStorage.getItem('development') == 'true'){
      return this.wagon = WAGON_EXAMPLE;
    }
    this._pickService.getWagon(this.device.stations[this.currentStationId].idStation).subscribe( w => {
      this.wagon = w;
    });
    
  }


  getWagons( stationId ) {    
    this._pickService.getWagon(stationId).subscribe( wagon =>   this.wagon = wagon , error => this.errorMessage = <any>error);
  }

  getItems() {
    
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
    this.log = new Log(this.wagon.wagonId, this.device.user , 'ANGULAR TESTE');    
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
