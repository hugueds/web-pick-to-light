import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { PickService } from "app/services/pick.service";

@Component({
  selector: 'wagon-container',
  templateUrl: './wagon-container.component.html',
  styleUrls: ['./wagon-container.component.css']  
})
export class WagonContainerComponent implements OnInit, OnChanges {

  @Input() currentItem: number;
  @Input() items: any[];
  @Input() orientation: string;

  @Output() partFinished = new EventEmitter<any>();

  border: string;
  boxes: any[];

  constructor(private _pickService: PickService) {
    this.boxes = [];
    this.orientation = 'horizontal';    
  }

  ngOnInit() {
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

  getNextPart() {    
    this.border = '20px solid limegreen';
    setTimeout(() => {
      this.border = '20px solid red';
      this._pickService.updateItem(this.currentItem);
    }, 1000)
  }




}
