import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[boxColor]'
})
export class BoxColorDirective {

  @HostBinding('style.backgroundColor') backgroundColor;

  constructor() { }


  @HostListener('isDone') onFinish() {
    this.backgroundColor = 'green';
  }

  @HostListener('inProcess') onStart() {
    this.backgroundColor = 'yellow';
  }

  @HostListener('mouseenter') clicke() {
    
      console.log('123123')
      this.backgroundColor = 'green'    

  }

}
