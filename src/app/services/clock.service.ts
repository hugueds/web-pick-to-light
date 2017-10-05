import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClockService {

  constructor() { }

  getDateTime() {
    const observable = new Observable(obs => {
      const dateTime = new Date();
      obs.next(dateTime);
    });
    return observable;
  }

}
