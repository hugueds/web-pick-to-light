import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Log } from '../models/Log';

@Injectable()

export class LogService {

  constructor(private _http: HttpClient) {

  }

  saveWagonLog(log: Log) {
    const url = '';
    this._http.post(url, '');
  }



}
