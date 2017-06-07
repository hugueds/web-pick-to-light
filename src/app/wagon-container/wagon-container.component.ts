import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'wagon-container',
  templateUrl: './wagon-container.component.html',  
  styleUrls: ['./wagon-container.component.css']
})
export class WagonContainerComponent implements OnInit, OnChanges {

  @Input() currentItem: number ;
  @Input() items : any[];
  @Input() orientation: string;

  boxes : any[];

  wagonSize: boolean = false;
  

  constructor() { 
    this.boxes = [];
  }

  ngOnInit() {
    this.orientation = 'horizontal';
    if (this.boxes.length > 0){
      this.boxes = this.items[this.currentItem].boxes;         
    }
  }

  ngOnChanges(){    
      this.items ? this.boxes = this.items[this.currentItem].boxes : null;
  }



}
