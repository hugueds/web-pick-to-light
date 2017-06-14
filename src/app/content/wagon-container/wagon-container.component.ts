import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'wagon-container',
  templateUrl: './wagon-container.component.html',
  styleUrls: ['./wagon-container.component.css']
})
export class WagonContainerComponent implements OnInit, OnChanges {

  @Input() currentItem: number;
  @Input() items: any[];
  @Input() orientation: string;
  border;

  boxes: any[];

  constructor() {
    this.boxes = [];
  }

  ngOnInit() {
    this.orientation = 'horizontal';
    if (this.boxes.length > 0) {
      this.boxes = this.items[this.currentItem].boxes;
    }
  }

  ngOnChanges() {
    this.items ? this.boxes = this.items[this.currentItem].boxes : null;

  }

  checkWagon() {

  }

  boxChanged(evento) {
    let result = this.boxes.map(a => a.quantity).reduce((a, b) => a + b);
    if (result == 0) {
      this.getNextPart();      
    }
  }

  getNextPart(){
    this.border = '10px solid limegreen';
    setTimeout(() => {
      this.border = '10px solid red';
      
    },2000)
  }




}
