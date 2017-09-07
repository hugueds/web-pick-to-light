import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { ClockService } from "app/services/clock.service";
import { SockService } from "app/services/sock.service";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers : [ClockService]
})

export class NavbarComponent implements OnInit, OnChanges, OnDestroy { 

  @Input() device;

  connection;
  checkConnection;
  dateTime: any;
  ip = 'Aguardando conexão...';
  isOnline: boolean = false;

  constructor(private _clockService: ClockService, private _sock: SockService) { }

  ngOnInit() {

        this.getTime();        
        this.connection = this._sock.getMessageFromPick('ip').subscribe( ip => {
          this.ip = <string> ip;    
          this.isOnline = true;      
        });

        this.checkConnection = this._sock.checkConnection().subscribe( status => {
          if (!status){          
            this.isOnline = false;
            this.ip = 'Aguardando conexão...';
          }         
        })
        
  }

  ngOnChanges(changes){
    console.log(changes)
  }

  ngOnDestroy(){
    this.connection.unsubscribe();
    this.checkConnection.unsubscribe(); 
  }

  getTime(){   
    setInterval(() => this._clockService.getDateTime().subscribe( d => this.dateTime = d), 1000);    
  }

}
