import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClockService {  

  constructor() { }

  getDateTime(){       
    let obs = new Observable( obs => {
      let dateTime = new Date();
      obs.next(dateTime);
    }); 
    return obs;
  }

  


}
