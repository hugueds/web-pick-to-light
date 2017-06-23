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
  currentStationId: number = 0;
  currentStationSequence: number = 0;
  errorMessage: any;
  log: Log;
  lastWagon: any = 'Nenhum';
  orientation: string = 'horizontal';

  constructor(private _pickService: PickService, private _deviceService: DeviceService) {
    this.device = _deviceService.getDeviceInfo();
  }

  ngOnInit() {

    this.wagon = {};

    if (localStorage.getItem('development') == 'true') {
      return this.wagon = WAGON_EXAMPLE;
    }

    this.currentStationId = this.device.stations[this.currentStationSequence];

    if (this.currentStationId) {
      this.getWagons(this.currentStationId);
    } else {
      console.log('Nao foi possivel carregar');
    }

    PickService.itemUpdated.subscribe(currentItem => {
      console.log('Peças da sequência ' + (currentItem + 1) + ' finalizadas');
      if (this.currentItem < (this.wagon.items.length - 1)) {
        this.currentItem++;
      }
      else {
        this.finishTest();
      }
    })

  }


  getWagons(stationId) {
    this._pickService.getWagon(stationId).subscribe(wagon => {
      console.log(`Carregando comboio ${wagon.wagonId}`);
      localStorage.setItem('currentWagon', JSON.stringify(wagon));
      this.wagon = wagon;
    }, error => this.errorMessage = <any>error);
  }

  addItemTest() {
    if (this.currentItem < this.wagon.items.length - 1) {
      this.currentItem++;
    }
  }

  resetTest() {
    this.currentItem = 0;
    this.getWagons(this.currentStationId);
  }

  finishTest() {
    this.log = new Log(this.wagon.wagonId, this.device.user, 'ANGULAR TESTE');
    this._pickService.finishWagon(this.log).subscribe(data => {
      this.lastWagon = data.wagon;
      localStorage.setItem('lastWagon', this.lastWagon);
      this.wagon = {};
      setTimeout(() => {
        this.getWagons(this.currentStationId);
        this.currentItem = 0;
      }, 2000);
    });
    this.currentItem = 0;
  }

  changeOrientationTest() {
    return this.orientation = this.orientation == 'horizontal' ? 'vertical' : 'horizontal';
  }


  ngOnChange() {

  }


}
