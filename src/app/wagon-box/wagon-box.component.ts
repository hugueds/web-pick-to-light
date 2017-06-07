import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'wagon-box',
  //templateUrl: './wagon-box.component.html',
  template : `  
    <md-card [class]='boxStyle'>
      <span class='box-quantity'> {{ box?.quantity}} </span>
    </md-card>      
  `,
  styleUrls: ['./wagon-box.component.css']
})
export class WagonBoxComponent implements OnInit, OnChanges {

  @Input() box: any;
  boxStyle: string;

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges(){
    if (this.box.quantity == 0){
      this.boxStyle = 'box-finished';
    }
    else{
      this.boxStyle = 'box-unfinished';
    }
  }

}
