import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

import { Config } from '../app.config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { MissingPart } from '../models/MissingPart';
import { Item } from '../models/Item';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class MissingPartService {

    private subject = new Subject();
    currentMessage$ = this.subject.asObservable();

    constructor(private _http: Http, private _config: Config) {

    }

    getMissingParts() {
        return this._http.get(`${this._config.server}/cel/1/parts`).map(body => body.json()).catch(this.handleError);
    }
    sendMissingPart(part: MissingPart) {
        return this._http.post(`${this._config.server}/cel/1/parts`, part).map(body => body.json()).catch(this.handleError);
    }

    addMissingPartToList(item: Item) {
        this.subject.next(item);
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
