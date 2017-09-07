import { EventEmitter, Output, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject';

import { Config } from 'app/app.config';
import * as io from 'socket.io-client';

//import * as s7 from 'node-snap7'

@Injectable()

export class SockService {

  private partMissingSocket;
  private pickToLightSocket;

  public static newPartMissing = new EventEmitter<string>();

  constructor(private _config: Config) {
    this.partMissingSocket = io.connect(this._config.missingPartServer);
    this.pickToLightSocket = io.connect(this._config.server);

    // let plc = new s7.S7Client();

    // plc.ConnectTo('10.8.66.82', 0, 2, (err) => console.log(err))

  }

  checkConnection() {
    let observable = new Observable(observer => {
      setInterval(() => {
        if (this.pickToLightSocket.connected) {
          observer.next(true)
        } else {
          observer.next(false)
        }
      }, 5000)
    })
    return observable;
  }

  getMessageFromPick(message) {
    let observable = new Observable(observer => {
      this.pickToLightSocket.on(message, data => {
        observer.next(data);
      })
    })
    return observable;
  }  

  getMessageFromMissing(message) {

  }


  sendMissingPartMessage(topic, message) {
    console.log('Emitindo para o topico: ' + topic + ' Valores: ' + JSON.stringify(message));
    this.partMissingSocket.emit(topic, message);
  }

  
}
