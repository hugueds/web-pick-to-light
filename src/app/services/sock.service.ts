import { EventEmitter, Output, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Config } from '../app.config';
import * as io from 'socket.io-client';

@Injectable()

export class SockService {

  public static newPartMissing = new EventEmitter<string>();
  private static pickToLightSocket;
  private static _TestPickToLightSocket;

  private partMissingSocket;

  constructor(private _config: Config) {
    this.partMissingSocket = io.connect(this._config.missingPartServer);
    SockService.pickToLightSocket = io.connect(this._config.server);
    // SockService._TestPickToLightSocket = io.connect(this._config.testServer);
  }

  checkConnection() {
    const observable = new Observable(observer => {
      setInterval(() => {
        if (SockService.pickToLightSocket.connected) {
          observer.next(true);
        } else {
          observer.next(false);
        }
      }, 5000);
    });
    return observable;
  }

  getMessageFromPick(message) {
    const observable = new Observable(observer => {
      SockService.pickToLightSocket.on(message, (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getMessageFromMissing(message) {

  }

  sendPickMessage(topic, message) {
    console.log(`Emitindo para o topico: %c ${topic} \n %c Valores: ${JSON.stringify(message)}`, 'color: green ;', 'color: blue;');
    SockService.pickToLightSocket.emit(topic, message);
    // SockService._TestPickToLightSocket.emit(topic, message); // Teste
  }

  sendMissingPartMessage(topic, message) {
    console.log(`Emitindo para o topico: %c ${topic} \n %c Valores: ${JSON.stringify(message)}`, 'color: green ;', 'color: blue;');
    this.partMissingSocket.emit(topic, message);
  }

}
