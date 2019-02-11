import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-wagon-box',
  templateUrl: './wagon-box.component.html',
  styleUrls: ['./wagon-box.component.css']
})
export class WagonBoxComponent implements OnInit, OnChanges {

  @Input() box: any;
  @Output() boxChanged = new EventEmitter<any>();

  isDone: boolean;
  boxStyle: string;

  constructor() { }

  ngOnInit() {
    this.checkQuantity();
  }

  ngOnChanges() {

  }

  confirm() {
    if (this.box.quantity > 0) {
      this.boxChanged.emit(this.box);
    }
    this.checkQuantity();
  }

  checkQuantity() {
    if (!this.box) {
      this.boxStyle = 'box-finished';
      return;
    }
    if (+this.box.quantity === 0) {
      this.boxStyle = 'box-finished';
    }
  }

}
