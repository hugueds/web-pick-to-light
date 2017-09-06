import { Component, OnInit, Input } from '@angular/core';
import { ClockService } from "app/services/clock.service";
import { SockService } from "app/services/sock.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers : [ClockService]
})
export class NavbarComponent implements OnInit { 

  @Input() device;

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
