import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Wagon } from 'app/models/Wagon';
import { WAGON_EXAMPLE } from 'app/examples/wagon.example';
import { Log } from 'app/models/Log';

@Injectable()

export class PickService {

  private server: string; //To define
  private testServer: string = 'http://10.33.22.56:5050';

  public static wagon: Wagon;
  public static currentItem: number = 0;

  public static  itemUpdated = new EventEmitter<any>();

  constructor(private _http: Http) { }

  getWagon(stationId) {
    let url = `${this.testServer}/getwagon/${stationId}`;
    return this._http.get(url).map(this.extractData).catch(this.handleError);
  }  
  
  updateItem( item ){
    PickService.itemUpdated.emit(item);
  }

  getConfiguration(deviceName: string) {
    let url = `${this.testServer}/getconfiguration/${deviceName}`;
    return this._http.get(url).map(this.extractData).catch(this.handleError);
  }

  getGroup(groupId) {
    let url = `${this.testServer}/getgroupid/${groupId}`;
    return this._http.get(url).map(this.extractData).catch(this.handleError);
  }

  finishWagon(log: Log) {
    let url = `${this.testServer}/finishWagon`;
    let headers = { 'Content-Type': 'application/json' };
    let options = { headers: headers };
    return this._http.post(url, log).map(this.extractData).catch(this.handleError);
  }

  finishItems(){
        
  }


  private extractData(res: Response) {
    let body = res.json();    
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getTestWagons() {
    return Promise.resolve(WAGON_EXAMPLE);
  }

  getTestWagonId() {
    return Promise.resolve(WAGON_EXAMPLE.wagonId);
  }

  getTestItems() {
    return Promise.resolve(WAGON_EXAMPLE.items);
  }


}
