import { Component, OnInit, OnDestroy } from '@angular/core';

import { PickService } from '../../services/pick.service';
import { DeviceService } from '../../services/device.service';
import { MissingPartService } from '../../services/missing-part.service';
import { SockService } from '../../services/sock.service';
import { TimerService } from '../../services/timer.service';

import { Log } from '../../models/Log';
import { Device } from '../../models/Device';
import { Wagon } from '../../models/Wagon';
import { PickShelf } from '../../models/PickShelf';
import { PopidList } from '../../models/PopidList';
import { Item } from '../../models/Item';

@Component({
  selector: 'app-Main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [TimerService]
})

export class MainComponent implements OnInit, OnDestroy {

  static buttonPressed: boolean;

  lastPartNumber = null;
  pickSubscriber = null;
  sockSubscriber = null;

  locked = false;
  loading = false;
  noWagons = false;
  buttonControl = true;
  updateScreen = true;
  requestBlocked = false;

  device: Device;
  wagon: Wagon = new Wagon();
  log: Log;
  currentItem = 0;
  currentStationId = 0;
  currentStationSequence: number;
  errorMessage: any;
  lastWagon: any = 'Nenhum';

  orientation: String = 'horizontal';
  pickingMethod = 'partNumber';
  isMCC: boolean;

  currentPopidSequence = 0;
  popidList: PopidList[];

  constructor(private _pickService: PickService
    , private _deviceService: DeviceService
    , private _sockService: SockService
    , private _mpService: MissingPartService
    , private _timerService: TimerService) {
    this.device = this._deviceService.getDeviceInfo();
  }

  ngOnInit() {

    this.currentStationSequence = +localStorage.getItem('currentStationSequence') || 0;
    localStorage.setItem('currentStationSequence', JSON.stringify(this.currentStationSequence));

    this.currentStationId = this.device.stations[this.currentStationSequence];

    if (!this.currentStationId) {
      console.error(`Não foi possível carregar o comboio`);
      // setTimeout(() => window.location.href = '/', 2000);
      return;
    }

    this.getWagons(this.currentStationId);

    localStorage.setItem('currentItem', JSON.stringify(this.currentItem));

    this._sockService.getMessageFromPick('turned on').subscribe((value: boolean) => {
      MainComponent.buttonPressed = false;
    });

    this.sockSubscriber = this._sockService.getMessageFromPick('button pressed').subscribe((button: PickShelf) => {
      const currentPart = this.wagon.items[this.currentItem].obj;
      const stationId = this.currentStationId;
      console.log(`%c Botao foi pressionado ${JSON.stringify(button)} `, 'background: cyan');
      if (this.loading) {
        return;
      }
      console.log(button);

      if ((currentPart === button.partNumber.toString()) && (currentPart !== this.lastPartNumber) ||
        (button.partNumber.toString() === '--OPK--' && button.stationId === stationId)) {
        console.log(`%c Botao da peça ${button.partNumber} pressionado`, 'background: limegreen');
        this.lastPartNumber = currentPart;
        this.addItem('picking');
      }

    });

    this._mpService.currentMessage$.subscribe((item: Item) => {
      this.wagon.items.push(item);
      this.addItem('partNumber');
    });

  }

  getWagons(stationId) {
    if (this.locked) {
      console.log('Operação em andamento, aguarde');
      return;
    }
    this.locked = true;
    this.loading = true;
    localStorage.setItem('currentStationId', JSON.stringify(stationId));
    this.cleanPendingButtons(stationId);
    this._pickService.getWagon(stationId).subscribe((wagon: Wagon) => { // TODO: Implementar tratativa de erro
      this.noWagons = false;
      if (wagon.error) {
        this.noWagons = true;
        return;
      }
      this.locked = false;
      // TODO: Verificar quando não há comboio, exibir mensagem
      console.log(`Carregando comboio %c ${wagon.wagonId} do posto de ID: ${stationId}`, 'color: blue;');
      MainComponent.buttonPressed = false;
      this.lastPartNumber = null;
      this.pickingMethod = this.getPickMethod(stationId);
      this.isMCC = this.verifyMCC(stationId);
      this.wagon = wagon;
      if (!this.wagon.items || this.wagon.items[0].idPart === 0 || !this.wagon.items[0].idPart) {
        return setTimeout(() => this.finishWagon(`Finalizando Comboio sem peças`), 5000);
      }
      this.popidList = this.rearrange(wagon.items).reverse();
      if (+this.currentStationId !== 5627 && +this.currentStationId !== 6026) {
        localStorage.setItem('currentWagon', JSON.stringify(this.wagon));
      }
      localStorage.setItem('currentPartNumber', JSON.stringify(this.wagon.items[this.currentItem].obj));
      this.updateScreen = false;
      this._timerService.start();
      this.turnOnButton();
      setTimeout(() => this.loading = false, 3000);
    }
      , error => this.errorMessage = <any>error);
  }

  private getPickMethod(stationId) {
    const popidStations = [3253, 5738, 5804, 565, 5814]; // 5627 // 6026
    const isPopid = popidStations.includes(stationId);
    return isPopid ? 'popid' : 'partNumber';
    // return stationId === 3253 || stationId === 5738  ? 'popid' : 'partNumber'; // Verficar alterações posteriores
  }

  private verifyMCC(stationId) {
    return stationId === 5705 || stationId === 1345; // Verificar alterações posteriores
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
        MainComponent.buttonPressed = false;
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
      MainComponent.buttonPressed = false;
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
    if (!this.wagon.wagonId) {
      // Exibir botão de recarregar, com mensagem: "Por favor, recarregue o pick to light"
      return;
    }
    this.log = new Log(this.wagon.wagonId, this.device.user, message);
    this._pickService.finishWagon(this.log).subscribe((data) => {
      this.currentItem = 0;
      this.currentPopidSequence = 0;
      localStorage.setItem('currentItem', JSON.stringify(this.currentItem));
      this.updateStationSequence();
      this._timerService.reset();
      setTimeout(() => {
        this.getWagons(this.currentStationId);
        this.returnItem();
      }, 1000);
    });
  }

  reload() {

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
    const display = this.wagon.items[this.currentItem].boxes.map(a => a.quantity).reduce((b, c) => b + c).toString();
    this._sockService.sendPickMessage('turn on', {
      plc: '', // Cadastrar o PLC em algum lugar
      stationId: this.currentStationId,
      partNumber: this.wagon.items[this.currentItem].obj,
      item: this.currentItem,
      display,
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
    if (this.sockSubscriber) {
      this.sockSubscriber.unsubscribe();
    }

    this._timerService.reset();
  }

  private rearrange(items) {
    if (!items.length) {
      return new PopidList('0', { obj: 0, sname: '', quantity: '' });
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
