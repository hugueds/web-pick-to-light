import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[boxColor]'
})
export class BoxColorDirective {

  @HostBinding('style.backgroundColor') backgroundColor;

  constructor() { }


  @HostListener('isDone') onFinish(){
    this.backgroundColor = 'green';
  }

  @HostListener('inProcess') onStart(){
    this.backgroundColor = 'yellow';
  }

   @HostListener('click') enter(){
    this.backgroundColor = 'green';
  }

}
