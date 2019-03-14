import { Component, OnInit, OnDestroy } from '@angular/core';
import { SockService } from '../../services/sock.service';

import * as SHELF_CONFIG from '../../shared/data/shelfconfig';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit, OnDestroy {

  config = SHELF_CONFIG.SHELF_CONFIG;
  stationId: any = 547;
  partNumber: any = '000000';
  controllers: number[] = Array.from(Array(10).keys());
  nodes: number[] = Array.from(Array(121).keys());
  colors: any = [
    { index: -1, name: 'Desligar' },
    { index: 0, name: 'Vermelho' },
    { index: 1, name: 'Verde' },
    { index: 2, name: 'Amarelo' },
    { index: 3, name: 'Cyan' },
    { index: 4, name: 'Rosa' },
    { index: 5, name: 'Azul' }
  ];
  subscriber;
  selected: any = {
    plc: 'P27',
    controller: 0,
    node: 1,
    arrowDirection: 1,
    display: '000',
    color: {
      index: 1
    }
  };

  constructor(private _sockService: SockService) { }

  ngOnInit() {
    this.subscriber = this._sockService.getMessageFromPick('button pressed').subscribe(button => {
      console.log('Button pressed');
      console.log(button);
    });

  }

  turnOn() {
    this._sockService.sendPickMessage('turn on', {
      stationId: this.stationId,
      partNumber: this.partNumber
    });
  }

  forceOn() {
    console.log('Acendendo lâmpada de teste');
    // TODO: Validar parametros, principalmente PLC
    this._sockService.sendPickMessage('force on', {
      plc: this.selected.plc,
      controllerId: this.selected.controller,
      buttonNode: this.selected.node,
      color: this.selected.color.index,
      arrowDirection: +this.selected.arrowDirection,
      display: this.selected.display.toString()
    });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}
