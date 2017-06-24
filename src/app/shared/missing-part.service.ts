import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { MissingPart } from "app/models/MissingPart";

@Injectable()

export class MissingPartService {

    private readonly server = 'http://10.8.66.81:8080';
    private readonly testServer = ''

    constructor(private _http: Http) { }

    sendMissingPart(part: MissingPart) {
        return this._http.post(`${this.server}/cel/1/parts`, part).map(body => body.json()).catch(this.handleError); //Hard Coded
    }

    getMissingParts() {
        return this._http.get(`${this.server}/cel/1/parts`).map(body => body.json()).catch(this.handleError); //Hard Coded
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
