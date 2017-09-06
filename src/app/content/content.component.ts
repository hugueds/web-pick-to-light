import { WAGON_EXAMPLE } from './../examples/wagon.example';
import { Component, OnInit } from '@angular/core';
import { PickService } from "app/services/pick.service";
import { Log } from "app/models/Log";
import { DeviceService } from "app/services/device.service";
import { Device } from "app/models/Device";
import { MissingPartService } from "app/services/missing-part.service";
import { Wagon } from "app/models/Wagon";

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnInit {

  device: Device;
  wagon: Wagon;
  currentItem: number = 0;
  currentStationId: number = 0;
  currentStationSequence: number = 0;
  errorMessage: any;
  log: Log;
  updateScreen: boolean = true;
  lastWagon: any = 'Nenhum';
  orientation: string = 'horizontal';

  constructor(private _pickService: PickService, private _deviceService: DeviceService, private _mpService: MissingPartService) {
    this.device = _deviceService.getDeviceInfo();
  }

  ngOnInit() {

    localStorage.setItem('currentItem', '0');

    if (localStorage.getItem('development') == 'true') { /* return this.wagon = WAGON_EXAMPLE;*/  }

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
        localStorage.setItem('currentItem', this.currentItem.toString());
      }
      else {
        this.finishTest();
      }
    })

  }


  getWagons(stationId) {
    this._pickService.getWagon(stationId).subscribe( wagon => {
      console.log(`Carregando comboio ${wagon.wagonId}`);
      localStorage.setItem('currentWagon', JSON.stringify(wagon));
      this.wagon = wagon;
      this.updateScreen = false;
    }, error => this.errorMessage = <any>error);
  }

  addItemTest() {
    if (this.currentItem < this.wagon.items.length - 1) {
      this.currentItem++;
      localStorage.setItem('currentItem', this.currentItem.toString());
    }
  }

  resetTest() {
    this.currentItem = 0;
    this.getWagons(this.currentStationId);
  }

  finishTest() {
    this.updateScreen = true;
    this.log = new Log(this.wagon.wagonId, this.device.user, 'ANGULAR TESTE');
    this._pickService.finishWagon(this.log).subscribe(data => {
      this.lastWagon = data.wagon;
      localStorage.setItem('lastWagon', this.lastWagon);
      setTimeout(() => {
        this.getWagons(this.currentStationId);
        this.currentItem = 0;
      }, 1000);
    });
    this.currentItem = 0;
  }

  changeOrientationTest() {
    return this.orientation = this.orientation == 'horizontal' ? 'vertical' : 'horizontal';
  }


  ngOnChange() {

  }


}
