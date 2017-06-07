import { EventEmitter, Output, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

export class SockService implements OnInit{

  private url: string = 'http://localhost:3000';
  private socket;

  static newIpMessage = new EventEmitter<string>();  

  constructor(){
    this.socket = io.connect(this.url);
    this.onNewIp();
  }

  onNewIp(){
    this.socket.on('ip', data => SockService.newIpMessage.emit(data));
  }


  sendMessage(topic, message){
    
  }

  getMessage(newEvent){
    
  }

  test(){
    
  }

  ngOnInit(){
   
  }

}
