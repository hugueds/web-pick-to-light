import { EventEmitter, Output, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

export class SockService implements OnInit {

  private url: string = 'http://localhost:3000';
  private readonly missingPartTestServer: string = 'http://10.8.66.81:8080';

  private socket;

  public static newIpMessage = new EventEmitter<string>();
  public static newPartMissing = new EventEmitter<string>();

  constructor() {
    // this.socket = io.connect(this.url);
    this.socket = io.connect(this.missingPartTestServer);    
    // this.onNewIp();
  }

  onNewIp() {
    this.socket.on('ip', data => SockService.newIpMessage.emit(data));
  }

  missingPart(part){
    // this.socket.emit('dec-part', data => SockService.newPartMissing.emit(data))
  }


  sendMessage(topic, message) {
    console.log('Emitindo para o topico: ' + topic + ' Valores: ' + JSON.stringify(message));
    this.socket.emit(topic, message);
  }

  getMessage(newEvent) {

  }

  test() {

  }

  ngOnInit() {

  }

}
