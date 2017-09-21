import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

import { Config } from '../app.config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Wagon } from '../models/Wagon';
import { WAGON_EXAMPLE } from '../examples/wagon.example';
import { Log } from '../models/Log';
import { Item } from "../models/Item";

@Injectable()

export class PickService {

  public static wagon: Wagon;
  public static currentItem: number = 0;

  public static itemUpdated = new EventEmitter<any>();

  constructor(private _http: Http, private _config: Config) { }

  getWagon(stationId): Observable<Wagon> {
    let url = `${this._config.server}/getwagon/${stationId}`;
    return this._http.get(url).map(this.extractData).catch(this.handleError);
  }

  updateItem(item) {
    PickService.itemUpdated.emit(item);
  }

  getConfiguration(deviceName: string) {
    let url = `${this._config.server}/getconfiguration/${deviceName}`;
    return this._http.get(url).map(this.extractData).catch(this.handleError);
  }

  getGroup(groupId) {
    let url = `${this._config.server}/getgroupid/${groupId}`;
    return this._http.get(url).map(this.extractData).catch(this.handleError);
  }

  finishWagon(log: Log) {
    let url = `${this._config.server}/finishWagon`;
    let headers = { 'Content-Type': 'application/json' };
    let options = { headers: headers };
    return this._http.post(url, log).map(this.extractData).catch(this.handleError);
  }

  getButtons() {
    let url = `${this._config.server}/buttons`;
    return this._http.get(url).map(this.extractData).catch(this.handleError);
  }

  getButton(buttonId) {
    let url = `${this._config.server}/buttons/${buttonId}`;
    return this._http.get(url).map(this.extractData).catch(this.handleError);
  }

  saveButton(button) {
    let url = `${this._config.server}/buttons`;
    return this._http.post(url, button).map(this.extractData).catch(this.handleError);
  }

  updateButton(button) {
    let url = `${this._config.server}/buttons/${button.buttonId}`;
    return this._http.put(url, button).map(this.extractData).catch(this.handleError);
  }

  deleteButton(button) {
    let url = `${this._config.server}/buttons/${button._id}`;
    return this._http.delete(url).map(this.extractData).catch(this.handleError);
  }

  getAllOpks() {
    let url = `${this._config.server}/opklist`;
    return this._http.get(url).map(this.extractData).catch(this.handleError);
  }

  saveOpk(opk) {
    let url = `${this._config.server}/opklist`;
    return this._http.post(url, opk).map(this.extractData).catch(this.handleError);
  }

  deleteOpk(opk) {
    let url = `${this._config.server}/opklist/${opk.partNumber}`;    
    return this._http.delete(url).map(this.extractData).catch(this.handleError);
  }

  getOpk(partNumber) {
    let url = `${this._config.server}/opklist/${partNumber}`;
    return this._http.get(url).map(this.extractData).catch(this.handleError);
  }  

  updateOpk(opk) {
    let url = `${this._config.server}/opklist/${opk.partNumber}`;
    return this._http.put(url, opk).map(this.extractData).catch(this.handleError);
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


}
