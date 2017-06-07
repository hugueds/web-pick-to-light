import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions  } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Wagon } from 'app/models/wagon';
import { WAGON_EXAMPLE } from 'app/wagon.example';
import { Log } from 'app/models/log';

@Injectable()

export class WagonService {

  private server: string;
  private testServer: string = 'http://localhost:5050';
  private wagon = new Wagon();  

  constructor(private _http: Http) { }

  getWagon(stationId) {        
    let url = `${this.testServer}/getwagon/${stationId}`;
    return this._http.get(url).map(this.extractData).catch(this.handleError);    
  }

  finishWagon(log){
    let url = `${this.testServer}/finishWagon`;           
    let headers = { 'Content-Type': 'application/json' };
    let options = { headers : headers };
    return this._http.post(url, log).map(this.extractData).catch(this.handleError);
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
