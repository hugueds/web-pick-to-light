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

    localStorage.setItem('currentItem', '0');
    this.currentStationSequence = Number(localStorage.getItem('currentStationSequence'));

    if (!this.currentStationSequence) {
      this.currentStationSequence = 0;
    }

    localStorage.setItem('currentStationSequence', JSON.stringify(this.currentStationSequence));

    this.currentStationId = this.device.stations[this.currentStationSequence];

    if (this.currentStationId) {
      this.getWagons(this.currentStationId);
      localStorage.setItem('currentStationId', JSON.stringify(this.currentStationId));
    } else {
      console.error(`Não foi possível carregar o comboio`);
      setTimeout(this.ngOnInit, 1000) //Verificar se esta rotina funciona
    }

    this.sockSubscriber = this._sockService.getMessageFromPick('button pressed').subscribe(button => {
      console.log(`Botao foi pressionado`, button);
      let currentPart = this.wagon.items[this.currentItem].obj;
      if (currentPart == (button as any).partNumber) {
          this.addItem(); 
      }
      else if ((button as any).partNumber == '--OPK--'
        && (button as any).stationId == this.currentStationId
        || (button as any).opk ) {
          console.log('Botao pressionado de peça OPK')
          this.addItem();
      }
    })

    // this.pickSubscriber = PickService.itemUpdated.subscribe(currentItem => {
    //   console.log('Peças da sequência ' + (currentItem + 1) + ' finalizadas');
    //   if (this.currentItem < (this.wagon.items.length - 1)) {
    //     //setTimeout(() => this.addItem(), 200);
    //   }
    //   else {
    //     //setTimeout(() => this.finishWagon(), 0);
    //   }
    // })
  }

  getWagons(stationId) {
    this._pickService.getWagon(stationId).subscribe(wagon => {
      if (wagon.items[0].idPart == 0) {
        return this.finishWagon();
      }
      console.log(`Carregando comboio ${wagon.wagonId}`);
      localStorage.setItem('currentWagon', JSON.stringify(wagon));
      this.wagon = wagon;
      this.updateScreen = false;
      localStorage.setItem('currentPartNumber', JSON.stringify(wagon.items[0].obj));
      this._sockService.sendPickMessage('turn on', {
        stationId: stationId,
        partNumber: wagon.items[0].obj,
        item : this.currentItem
      })
    }
      , error => this.errorMessage = <any>error);
  }

  addItem() {
    this.buttonControl = false;
    if (this.currentItem >= this.wagon.items.length - 1) {
      setTimeout(() => this.buttonControl = true, 500);
      setTimeout(this.finishWagon(), 500);
    }
    else if (this.currentItem < this.wagon.items.length - 1) {
      this.currentItem++;
      localStorage.setItem('currentItem', JSON.stringify(this.currentItem));
      localStorage.setItem('currentPartNumber', JSON.stringify(this.wagon.items[this.currentItem].obj));
      this._sockService.sendPickMessage('turn on', {
        stationId: this.currentStationId,
        partNumber: this.wagon.items[this.currentItem].obj,
        item : this.currentItem
      })
      setTimeout(() => this.buttonControl = true, 500);
    }
  }

  returnItem() {
    this.buttonControl = false;
    if (this.currentItem == 0) {
      this.buttonControl = true;
      return;
    }
    else if (this.currentItem < this.wagon.items.length - 1) {
      this.currentItem--;
      localStorage.setItem('currentItem', this.currentItem.toString());
      localStorage.setItem('currentPartNumber', JSON.stringify(this.wagon.items[this.currentItem].obj));
      this._sockService.sendPickMessage('turn on', {
        stationId: this.currentStationId,
        partNumber: this.wagon.items[this.currentItem].obj,
        item: this.currentItem,
        clearLast: true
      })
      setTimeout(() => this.buttonControl = true, 500);      
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
      localStorage.setItem('currentItem', '0');
      this.currentItem = 0;
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

  changeOrientationTest() {
    return this.orientation = this.orientation == 'horizontal' ? 'vertical' : 'horizontal';
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
