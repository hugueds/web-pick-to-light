import { Injectable, EventEmitter } from '@angular/core';
// import { Http, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Config } from '../app.config';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Wagon } from '../models/Wagon';
import { WAGON_EXAMPLE } from '../examples/wagon.example';
import { Log } from '../models/Log';
import { Item } from '../models/Item';

@Injectable()

export class PickService {

  public static wagon: Wagon;
  public static currentItem: Number = 0;

  public static itemUpdated = new EventEmitter<any>();

  constructor(private _http: HttpClient, private _config: Config) { }

  getWagon(stationId): Observable<Wagon> {
    const url = `${this._config.server}/getwagon/${stationId}`;
    return this._http.get<Wagon>(url);
  }

  updateItem(item) {
    PickService.itemUpdated.emit(item);
  }

  getConfiguration(deviceName: string) {
    const url = `${this._config.server}/getconfiguration/${deviceName}`;
    return this._http.get(url);
  }

  getGroup(groupId) {
    const url = `${this._config.server}/getgroupid/${groupId}`;
    return this._http.get(url);
  }

  finishWagon(log: Log): Observable<any> {
    const url = `${this._config.server}/finishWagon`;
    const headers = { 'Content-Type': 'application/json' };
    const options = { headers: headers };
    if (!log.idWagon) {

    }
    return this._http.post(url, log);
  }

  getButtons() {
    const url = `${this._config.server}/buttons`;
    return this._http.get(url);
  }

  getButton(buttonId) {
    const url = `${this._config.server}/buttons/${buttonId}`;
    return this._http.get(url);
  }

  getButtonsByPLC(plcName) {
    const url = `${this._config.server}/buttons/plc/${plcName}`;
    return this._http.get(url);
  }

  saveButton(button) {
    const url = `${this._config.server}/buttons`;
    return this._http.post(url, button);
  }

  updateButton(button) {
    const url = `${this._config.server}/buttons/${button.buttonId}`;
    return this._http.put(url, button);
  }

  deleteButton(button) {
    const url = `${this._config.server}/buttons/${button._id}`;
    return this._http.delete(url);
  }

  getAllOpks() {
    const url = `${this._config.server}/opklist`;
    return this._http.get(url);
  }

  saveOpk(opk) {
    const url = `${this._config.server}/opklist`;
    return this._http.post(url, opk);
  }

  deleteOpk(opk) {
    const url = `${this._config.server}/opklist/${opk.partNumber}`;
    return this._http.delete(url);
  }

  getOpk(partNumber) {
    const url = `${this._config.server}/opklist/${partNumber}`;
    return this._http.get(url);
  }

  updateOpk(opk) {
    const url = `${this._config.server}/opklist/${opk.partNumber}`;
    return this._http.put(url, opk);
  }

  private extractData(res: Response) {
    return res.json() || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
