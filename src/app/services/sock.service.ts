import { EventEmitter, Output, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Config } from '../app.config';
import * as io from 'socket.io-client';



@Injectable()

export class SockService {

  public static newPartMissing = new EventEmitter<string>();

  private partMissingSocket;
  private pickToLightSocket;


  constructor(private _config: Config) {
    this.partMissingSocket = io.connect(this._config.missingPartServer);
    this.pickToLightSocket = io.connect(this._config.server);
  }

  checkConnection() {
    const observable = new Observable(observer => {
      setInterval(() => {
        if (this.pickToLightSocket.connected) {
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
      this.pickToLightSocket.on(message, data => {
        observer.next(data);
      });
    });
    return observable;
  }

  getMessageFromMissing(message) {

  }

  sendPickMessage(topic, message) {
    console.log(`Emitindo para o topico: %c ${topic} \n %c Valores: ${JSON.stringify(message)})`, 'color: green ;', 'color: blue;');
    this.pickToLightSocket.emit(topic, message);
  }

  sendMissingPartMessage(topic, message) {
    console.log(`Emitindo para o topico: %c ${topic} \n %c Valores: ${JSON.stringify(message)})`, 'color: green ;', 'color: blue;');
    this.partMissingSocket.emit(topic, message);
  }

}
