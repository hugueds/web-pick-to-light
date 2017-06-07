import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { WagonService } from "app/shared/wagon.service";
import { SockService } from 'app/shared/sock.service';
import * as io from 'socket.io-client';
import { Log } from "app/models/log";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WagonService]
})

export class AppComponent implements OnInit {  

  functions: Array<any>;
  myData: Array<any>;
  wagon: any = {};  
  currentItem: number = 0;    
  errorMessage: any;
  log: Log;
  lastWagon: any = 'Nenhum';
  orientation: string = 'horizontal';

  constructor(private _wagonService: WagonService,
              private _sock:SockService){ }

  getWagons() {
    // this._wagonService.getTestWagons().then((wagon) => this.wagon = wagon); // Static Tests
    this._wagonService.getWagon('547').subscribe(
       wagon =>   this.wagon = wagon      
      , error => this.errorMessage = <any>error);
  }

  getItems() {
    // this._wagonService.getTestItems().then((items) => this.items = items); // Static Tests
  }
    

  ngOnInit() {      
    this.getWagons(); // Static Tests
    // this.getItems();    // Static Tests        
  }

  addItem(){
    if (this.currentItem < this.wagon.items.length - 1){
      this.currentItem++;
    }
  }

  reset(){
    this.currentItem = 0;
  }

  finish(){    
    this.log = new Log(this.wagon.wagonId, 'SSBHPE', 'ANGULAR TESTE');
    console.log(this.log);
    this._wagonService.finishWagon(this.log).subscribe( data => {
      this.lastWagon = data.wagon; //Guardar no localstorage
      this.currentItem = 0;
      this.wagon = {}; //Guardar no localstorage
      setTimeout( () => this.getWagons(), 5000);      
    });
    this.currentItem = 0;    
  }

  changeOrientation(){        
    console.log(this.orientation);
    return this.orientation = this.orientation ==  'horizontal' ? 'vertical' : 'horizontal';
  }

  
  ngOnChange() {
  
  }

}
