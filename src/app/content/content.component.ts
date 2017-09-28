import { Component, OnInit, OnDestroy } from '@angular/core';

import { WAGON_EXAMPLE } from './../examples/wagon.example';

import { PickService } from "../services/pick.service";
import { DeviceService } from "../services/device.service";
import { MissingPartService } from "../services/missing-part.service";
import { SockService } from '../services/sock.service';
import { TimerService } from '../services/timer.service';


import { Log } from "../models/Log";
import { Device } from "../models/Device";
import { Wagon } from "../models/Wagon";
import { PickShelf } from '../models/PickShelf';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [TimerService]
})
export class ContentComponent implements OnInit, OnDestroy {

  device: Device;
  wagon: Wagon;
  log: Log;  
  currentItem: number = 0;
  currentStationId: number = 0;
  currentStationSequence: number;
  errorMessage: any;
  buttonControl: boolean = true;
  updateScreen: boolean = true;
  requestBlocked: boolean = false;  
  lastWagon: any = 'Nenhum';  
  orientation: string = 'horizontal';
  pickSubscriber;
  sockSubscriber;
  


  constructor(private _pickService: PickService
    , private _deviceService: DeviceService
    , private _sockService: SockService
    , private _mpService: MissingPartService
    ,private _timerService: TimerService ) {
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
        this.addItem('picking');
      }
    })
  }

  getWagons(stationId) {
    localStorage.setItem('currentStationId', JSON.stringify(stationId));

    this._pickService.getWagon(stationId).subscribe(wagon => {
      console.log(`Carregando comboio %c ${wagon.wagonId}`, 'color: blue;');
      this.currentItem = 0;
      this.wagon = wagon;
      if (this.wagon.items[0].idPart == 0) {
        return setTimeout(this.finishWagon(`Finalizando Comoboio sem peças`), 1000);
      }
      localStorage.setItem('currentWagon', JSON.stringify(this.wagon));
      localStorage.setItem('currentPartNumber', JSON.stringify(this.wagon.items[this.currentItem].obj));
      this.turnOnButton();
      this.updateScreen = false;
      if (stationId == 723) {
        let itens = this.wagon.items;
        this.wagon.items.push(...itens);                
      }          
      setTimeout(this.returnItem(), 200);
      this._timerService.start();
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
      this.finishWagon(`Comboio finalizado via Pick to Light, tempo de Operação: ${this._timerService.getTimeString()}`);
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
    this.log = new Log(this.wagon.wagonId, this.device.user, message);
    this._pickService.finishWagon(this.log).subscribe(data => {
      this.lastWagon = data.wagon;
      localStorage.setItem('lastWagon', this.lastWagon);
      this.currentItem = 0;
      localStorage.setItem('currentItem', JSON.stringify(this.currentItem));
      this.updateStationSequence();
      this._timerService.reset();
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
    //return this.orientation = this.orientation == 'horizontal' ? 'vertical' : 'horizontal';
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
    //this.pickSubscriber.unsubscribe();
  }


}
