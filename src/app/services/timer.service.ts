import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class TimerService {

  static Time = 0;
  static interval: any;

  constructor() { }

  getTime(): Observable<any>{
    let obs = new Observable( o => {      
      setInterval(() => o.next(TimerService.Time), 1000);
    }); 
    return obs;
  }

  getTimeString(){
    let h, m, s: number = 0;  
    let timer: string;

    m = (TimerService.Time / 1000 / 60) << 0;
    s = (TimerService.Time / 1000) % 60;

    if (s < 10)
      timer = `${m}:0${s}`;
    else
      timer = `${m}:${s}`;

    return timer;    
  }

  start(){
    TimerService.interval = setInterval( () => { this.increaseTime() }, 1000 );
  }

  pause(){
    clearInterval(TimerService.interval);
  }

  reset(){
    this.pause();
    TimerService.Time = 0;
  }

  increaseTime(){
    TimerService.Time += 1000;            
  } 

}
