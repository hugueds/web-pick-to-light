import { Component, OnInit, OnDestroy } from '@angular/core';

import { WAGON_EXAMPLE } from './../examples/wagon.example';

import { PickService } from "../services/pick.service";
import { DeviceService } from "../services/device.service";
import { MissingPartService } from "../services/missing-part.service";
import { SockService } from '../services/sock.service';

import { Log } from "../models/Log";
import { Device } from "../models/Device";
import { Wagon } from "../models/Wagon";
import { PickShelf } from '../models/PickShelf';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {

  device: Device;
  wagon: Wagon;
  currentItem: number = 0;
  currentStationId: number = 0;
  currentStationSequence: number;
  errorMessage: any;
  log: Log;
  buttonControl: boolean = true;
  updateScreen: boolean = true;
  lastWagon: any = 'Nenhum';
  orientation: string = 'horizontal';
  pickSubscriber;
  sockSubscriber;
  lastOpk;


  constructor(private _pickService: PickService
    , private _deviceService: DeviceService
    , private _sockService: SockService
    , private _mpService: MissingPartService) {
    this.device = _deviceService.getDeviceInfo();
    this.wagon = new Wagon();
  }

  ngOnInit() {

    localStorage.setItem('currentItem', JSON.stringify(this.currentItem));
    this.currentStationSequence = Number(localStorage.getItem('currentStationSequence'));

    if (!this.currentStationSequence) {
      this.currentStationSequence = 0;
    }

    localStorage.setItem('currentStationSequence', JSON.stringify(this.currentStationSequence));
    this.currentStationId = this.device.stations[this.currentStationSequence];

    if (this.currentStationId) {
      this.getWagons(this.currentStationId);
    } else {
      console.error(`%c Não foi possível carregar o comboio`, 'background: red;');
      setTimeout(this.ngOnInit, 1000) //Verificar se esta rotina funciona
    }

    this.sockSubscriber = this._sockService.getMessageFromPick('button pressed').subscribe(button => {
      let currentPart = this.wagon.items[this.currentItem].obj;
      console.log(`%c Botao foi pressionado ${JSON.stringify(button)} `, 'background: limegreen');
      if (currentPart == (button as any).partNumber) {
        this.addItem();
      }
    })
  }

  getWagons(stationId) {
    localStorage.setItem('currentStationId', JSON.stringify(stationId));

    this._pickService.getWagon(stationId).subscribe(wagon => {
      if (wagon.items[0].idPart == 0) {
        return this.finishWagon();
      }
      console.log(`Carregando comboio ${wagon.wagonId}`);
      this.currentItem = 0;
      this.wagon = wagon;
      localStorage.setItem('currentWagon', JSON.stringify(this.wagon));
      localStorage.setItem('currentPartNumber', JSON.stringify(this.wagon.items[this.currentItem].obj));
      this.turnOnButton();
      this.updateScreen = false;
      if (stationId == 723) {
        
      }

      setTimeout(this.returnItem(), 100);
    }
      , error => this.errorMessage = <any>error);
  }

  addItem(method: string = '') {
    if (method == 'picking') {
      this.wagon.items[this.currentItem].isPicked = true;
    }
    this.buttonControl = false;
    if (this.currentItem >= this.wagon.items.length - 1) {
      setTimeout(() => this.buttonControl = true, 750);
      setTimeout(this.finishWagon(), 700);
    }
    else if (this.currentItem < this.wagon.items.length - 1) {
      this.currentItem++;
      localStorage.setItem('currentItem', JSON.stringify(this.currentItem));
      localStorage.setItem('currentPartNumber', JSON.stringify(this.wagon.items[this.currentItem].obj));
      this.turnOnButton();
      setTimeout(() => this.buttonControl = true, 750);
    }
  }

  returnItem() {
    this.buttonControl = false;
    if (this.currentItem == 0) {
      this.buttonControl = true;
      return;
    }
    else {
      this.currentItem--;
      localStorage.setItem('currentItem', this.currentItem.toString());
      localStorage.setItem('currentPartNumber', JSON.stringify(this.wagon.items[this.currentItem].obj));
      this.turnOnButton(true);
      setTimeout(() => this.buttonControl = true, 750);
    }
  }

  resetWagon() {
    this.currentItem = 0;
    localStorage.setItem('currentItem', JSON.stringify(this.currentItem));
    this.getWagons(this.currentStationId);
  }

  finishWagon(message: string = '') {
    this.updateScreen = true;
    this.log = new Log(this.wagon.wagonId, this.device.user, 'test message');
    this._pickService.finishWagon(this.log).subscribe(data => {
      this.lastWagon = data.wagon;
      localStorage.setItem('lastWagon', this.lastWagon);
      this.currentItem = 0;
      localStorage.setItem('currentItem', JSON.stringify(this.currentItem));
      this.updateStationSequence();
      this.getWagons(this.currentStationId);
    });
  }

  updateStationSequence() {
    if (this.currentStationSequence < this.device.stations.length - 1) {
      this.currentStationSequence++;
    }
    else if (this.currentStationSequence == this.device.stations.length - 1) {
      this.currentStationSequence = 0;
    }

    this.currentStationId = this.device.stations[this.currentStationSequence];

    localStorage.setItem('currentStationSequence', JSON.stringify(this.currentStationSequence));
    localStorage.setItem('currentStationId', JSON.stringify(this.currentStationId));
  }

  turnOnButton(toClean = false) {
    this._sockService.sendPickMessage('turn on', {
      stationId: this.currentStationId,
      partNumber: this.wagon.items[this.currentItem].obj,
      item: this.currentItem,
      clearLast: toClean
    })
  }

  changeOrientationTest() {
    return this.orientation = this.orientation == 'horizontal' ? 'vertical' : 'horizontal';
  }


  checkPendingItems() {

  }

  confirm() {

  }

  ngOnChange() {

  }

  ngOnDestroy() {
    this.sockSubscriber.unsubscribe();
    //this.pickSubscriber.unsubscribe();
  }


}
