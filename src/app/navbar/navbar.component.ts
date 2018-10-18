import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';

import { ClockService } from '../services/clock.service';
import { SockService } from '../services/sock.service';
import { Device } from '../models/Device';
import { DeviceService } from '../services/device.service';
import { TimerService } from '../services/timer.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ClockService, TimerService]
})

export class NavbarComponent implements OnInit, OnChanges, OnDestroy {

  device: Device;
  connection;
  checkConnection;
  dateTime: any;
  ip: String = 'Aguardando Conexão...';
  isOnline: Boolean = false;
  timer: any;
  timerSubscriber;

  constructor(
    private _clockService: ClockService
    , private _sock: SockService
    , private _deviceService: DeviceService
    , private _timerService: TimerService
    , private _http: Http
  ) { }

  ngOnInit() {
    this.getTime();
    this.timerSubscriber = this._timerService.getTime().subscribe(t => this.timer = t);
    this.device = this._deviceService.getDeviceInfo();
    this.connection = this._sock.getMessageFromPick('ip').subscribe(ip => {
      this.ip = <string>ip;
      this.isOnline = true;
    });

    this.checkConnection = this._sock.checkConnection().subscribe(status => {
      if (!status) {
        this.isOnline = false;
        this.ip = 'Aguardando conexão...';
      }
    });

  }

  ngOnChanges(changes) {

  }

  ngOnDestroy() {
    this.connection.unsubscribe();
    this.checkConnection.unsubscribe();
    this.timerSubscriber.unsubscribe();
  }

  andonCall() {
    const { groupName, name, user } = this.device;
    const message = `
    ⚠ ANDON ⚠
  USUARIO: ${user}
  INSTANCIA: ${groupName.replace(/\//g, '')}
  ${name}
    `;
    // const message = `Usu%C3%A1rio%3A+hugueds+Chamando+Andon+na+Inst%C3%A2ncia%3A+FA1.1%2FCx.+Dire%C3%A7%C3%A3o+no+Tablet%3A+TABLET65`;
    console.log(message);

    const cUri = encodeURI(message);
    console.log(cUri);

    const a = this._http.get('http://10.8.66.81/telegram/PRIDE' + cUri).map(r => r.json());
    a.subscribe(b => console.log(b));
  }

  getTime() {
    setInterval(() => this._clockService.getDateTime().subscribe(d => this.dateTime = d), 1000);
  }

}
