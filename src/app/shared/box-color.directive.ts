import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[boxColor]'
})
export class BoxColorDirective {

  constructor() { }
  

  @HostListener('mouseenter', ['$event.target']) onClick() {
    
      console.log('123123')
      this.backgroundColor = 'green'    

  }

  @HostBinding('style.backgroundColor') backgroundColor;


  

}
