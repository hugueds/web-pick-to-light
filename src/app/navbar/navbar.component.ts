import { Component, OnInit } from '@angular/core';
import { ClockService } from "app/shared/clock.service";
import { SockService } from "app/shared/sock.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers : [ClockService]
})
export class NavbarComponent implements OnInit { 

  dateTime: any;
  ip: string = 'Aguardando conexão...';
  statusCircle: string = 'statusOffline';

  constructor(private _clockService: ClockService, private _sock:SockService) { }

  ngOnInit() {
        this.getTime();
        SockService.newIpMessage.subscribe( ip => this.ip = ip);
  }

  getTime(){   
    setInterval(() => this._clockService.getDateTime().subscribe( d => this.dateTime = d), 1000);    
  }

}
