import { Component, OnInit } from '@angular/core';
import { DeviceService } from "app/shared/device.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  devices: string[] = [];
  user: string = ''  
  selectedDevice : any = {};
  

  constructor(private _deviceService:DeviceService,  private _router: Router) {        
    this.generateTabletList();
  }

  ngOnInit() {
    this.selectedDevice.name = this.devices[0]
  }

  saveChanges() {

    if (this.selectedDevice.name == ''){
      console.log('DISPOSITIVO NÃO FOI SELECIONADO');
      return;
    } 

    if (this.selectedDevice.user == undefined){
      console.log('USUÁRIO NÃO FOI SELECIONADO');
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

}
