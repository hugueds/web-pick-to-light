import { Component, OnInit, OnDestroy } from '@angular/core';
import { SockService } from '../services/sock.service';


@Component({
  selector: 'tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit, OnDestroy {

  stationId: any = 547;
  partNumber: any = '000000';
  controllers: number[] = Array.from(Array(8).keys());
  nodes: number[] = Array.from(Array(30).keys());
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
  selected: any = {};

  constructor(private _sockService: SockService) {

  }

  ngOnInit() {
    this.subscriber = this._sockService.getMessageFromPick('button pressed').subscribe(button => {
      console.log(button);
    });

  }

  turnOn() {
    this._sockService.sendPickMessage('turn on', {
      stationId: this.stationId, partNumber: this.partNumber
    });
  }

  forceOn() {
    console.log('Acendendo lâmpada de teste');
    console.log(this.selected);
    this._sockService.sendPickMessage('force on', {
      controller: this.selected.controller, node: this.selected.node, color: this.selected.color
    });
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}
