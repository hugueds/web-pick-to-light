import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(ms: number, args?: any): any {
    let h, m, s: number = 0;
    let timer: string;

    m = (ms / 1000 / 60) << 0;
    s = (ms / 1000) % 60;

    if (s < 10)
      timer = `${m}:0${s}`;
    else
      timer = `${m}:${s}`;

    return timer;
  }

}
