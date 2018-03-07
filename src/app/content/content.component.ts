import { Component, OnInit, OnDestroy } from '@angular/core';

import { WAGON_EXAMPLE } from './../examples/wagon.example';

import { PickService } from '../services/pick.service';
import { DeviceService } from '../services/device.service';
import { MissingPartService } from '../services/missing-part.service';
import { SockService } from '../services/sock.service';
import { TimerService } from '../services/timer.service';

import { Log } from '../models/Log';
import { Device } from '../models/Device';
import { Wagon } from '../models/Wagon';
import { PickShelf } from '../models/PickShelf';
import { PopidList } from '../models/PopidList';
import { Observable } from 'rxjs/Observable';
import { Item } from '../models/Item';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [TimerService]
})

export class ContentComponent implements OnInit, OnDestroy {

  static buttonPressed: boolean;
  device: Device;
  wagon: Wagon = new Wagon();
  log: Log;
  currentItem = 0;
  currentStationId = 0;
  currentStationSequence: number;
  errorMessage: any;
  buttonControl: Boolean = true;
  updateScreen: Boolean = true;
  requestBlocked: Boolean = false;
  lastWagon: any = 'Nenhum';
  lastPartNumber;
  orientation: String = 'horizontal';
  pickingMethod = 'partNumber';

  loading = false;

  currentPopidSequence = 0;
  popidList: PopidList[];

  pickSubscriber;
  sockSubscriber;

  constructor(private _pickService: PickService
    , private _deviceService: DeviceService
    , private _sockService: SockService
    , private _mpService: MissingPartService
    , private _timerService: TimerService) {
    this.device = _deviceService.getDeviceInfo();
  }

  ngOnInit() {

    this.currentStationSequence = Number(localStorage.getItem('currentStationSequence')) || 0;

    localStorage.setItem('currentStationSequence', JSON.stringify(this.currentStationSequence));
    this.currentStationId = this.device.stations[this.currentStationSequence];

    if (!this.currentStationId) {
      console.error(`%c Não foi possível carregar o comboio`, 'background: red;');
      setTimeout(() => window.location.href = '/', 1000);
      return;
    }

    this.getWagons(this.currentStationId);

    localStorage.setItem('currentItem', JSON.stringify(this.currentItem));

    this._sockService.getMessageFromPick('turned on').subscribe((value: boolean) => {
      ContentComponent.buttonPressed = false;
    });

    this.sockSubscriber = this._sockService.getMessageFromPick('button pressed').subscribe((button: PickShelf) => {
      const currentPart = this.wagon.items[this.currentItem].obj;
      console.log(`%c Botao foi pressionado ${JSON.stringify(button)} `, 'background: cyan');
      if (this.loading) {
        return;
      }
      if ((currentPart === button.partNumber.toString()) && (currentPart !== this.lastPartNumber)) {
        console.log(`%c Botao da peça ${button.partNumber} pressionado`, 'background: limegreen');
        this.lastPartNumber = currentPart;
        this.addItem('picking');
      }

    });

    this._mpService.currentMessage$.subscribe( (item: Item) => {
      this.wagon.items.push(item);
      this.addItem('partNumber');
    });

  }

  getWagons(stationId) {
    this.loading = true;
    localStorage.setItem('currentStationId', JSON.stringify(stationId));
    this.cleanPendingButtons(stationId);
    this._pickService.getWagon(stationId).subscribe((wagon: Wagon) => {
      console.log(`Carregando comboio %c ${wagon.wagonId} do posto de ID: ${stationId}`, 'color: blue;');
      ContentComponent.buttonPressed = false;
      this.lastPartNumber = null;
      this.pickingMethod = this.getPickMethod(stationId);
      this.wagon = wagon;
      if (this.wagon.items[0].idPart === 0 || !this.wagon.items[0].idPart) {
        return setTimeout(this.finishWagon(`Finalizando Comoboio sem peças`), 1000);
      }
      this.popidList = this.rearrange(wagon.items).reverse();
      localStorage.setItem('currentWagon', JSON.stringify(this.wagon));
      localStorage.setItem('currentPartNumber', JSON.stringify(this.wagon.items[this.currentItem].obj));
      this.updateScreen = false;
      this._timerService.start();
      this.turnOnButton();
      setTimeout(() => this.loading = false, 3000);
    }
      , error => this.errorMessage = <any>error);
  }

  private getPickMethod(stationId) {
    return stationId === 3253 ? 'popid' : 'partNumber';
  }

  addItem(method: string = '') {

    if (this.loading) {
      return;
    }

    this.buttonControl = false;

    if (method === 'picking') {
      this.wagon.items[this.currentItem].isPicked = true;
    }
    if (this.pickingMethod === 'partNumber') {
      this.addPartNumber();
    } else if (this.pickingMethod === 'popid') {
      this.addPopid();
    }
  }

  private addPartNumber() {
    if (this.currentItem >= this.wagon.items.length - 1) {
      setTimeout(() => {
        this.buttonControl = true;
        ContentComponent.buttonPressed = false;
      }, 1000);
      this.finishWagon(`Comboio finalizado via Pick to Light, tempo de Operação: ${this._timerService.getTimeString()}`);
    } else if (this.currentItem < this.wagon.items.length - 1) {
      setTimeout(() => this.buttonControl = true, 500);
      this.currentItem++;
      localStorage.setItem('currentItem', JSON.stringify(this.currentItem));
      localStorage.setItem('currentPartNumber', JSON.stringify(this.wagon.items[this.currentItem].obj));
      this.turnOnButton();
      return;
    }
  }

  private addPopid() {
    this.buttonControl = true;
    if (this.currentPopidSequence >= this.popidList.length - 1) {
      this.finishWagon(`Comboio finalizado via Pick to Light, tempo de Operação: ${this._timerService.getTimeString()}`);
    }
    this.currentPopidSequence++;
  }

  buttonAddItem() {
    this.addItem('button');
  }

  returnItem() {
    if (this.pickingMethod === 'partNumber') {
      this.returnPartNumber();
    } else if (this.pickingMethod === 'popid') {
      this.returnPopid();
    }
  }

  private returnPartNumber() {
    this.buttonControl = false;
    if (this.currentItem === 0) {
      this.buttonControl = true;
      return;
    } else {
      this.lastPartNumber = this.wagon.items[this.currentItem].obj;
      this.currentItem--;
      ContentComponent.buttonPressed = false;
      localStorage.setItem('currentItem', this.currentItem.toString());
      localStorage.setItem('currentPartNumber', JSON.stringify(this.wagon.items[this.currentItem].obj));
      this.turnOnButton(true);
      setTimeout(() => this.buttonControl = true, 1000);
    }
  }

  private returnPopid() {
    this.buttonControl = false;
    if (this.currentPopidSequence === 0) {
      this.buttonControl = true;
      return;
    }
    this.currentPopidSequence--;
    this.buttonControl = true;
  }

  resetWagon() {
    this.currentItem = 0;
    localStorage.setItem('currentItem', JSON.stringify(this.currentItem));
    this.getWagons(this.currentStationId);
  }

  finishWagon(message: string = '') {
    this.updateScreen = true;
    this.log = new Log(this.wagon.wagonId, this.device.user, message);
    this._pickService.finishWagon(this.log).subscribe(data => {
      this.lastWagon = data.wagon;
      localStorage.setItem('lastWagon', this.lastWagon);
      this.currentItem = 0;
      this.currentPopidSequence = 0;
      localStorage.setItem('currentItem', JSON.stringify(this.currentItem));
      this.updateStationSequence();
      this._timerService.reset();
      setTimeout(() => {
        this.getWagons(this.currentStationId);
        this.returnItem();
      }, 100);
    });
  }

  cleanPendingButtons(stationId: number) {
    this._sockService.sendPickMessage('clean station', stationId);
  }

  updateStationSequence() {
    if (this.currentStationSequence < this.device.stations.length - 1) {
      this.currentStationSequence++;
    } else if (this.currentStationSequence === this.device.stations.length - 1) {
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
    });
  }

  checkPendingItems() {

  }

  confirm() {

  }

  ngOnChange() {

  }

  ngOnDestroy() {
    this.sockSubscriber.unsubscribe();
    this._timerService.reset();
  }

  private rearrange(items) {
    if (!items.length) {
      return new PopidList('0', { obj : 0, sname: '', quantity: '' });
    }
    return items[0].boxes.map((item, i) => {
      const parts = [];
      for (let j = 0; j < items.length; j++) {
        if (items[j].boxes[i].quantity > 0) {
          parts.push({
            obj: items[j].obj,
            sname: items[j].sname,
            quantity: items[j].boxes[i].quantity
          });
        }
      }
      return new PopidList(item.popId, parts);
    });
  }

}
