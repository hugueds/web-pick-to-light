import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { PickService } from '../../../services/pick.service';

@Component({
  selector: 'app-wagon-container',
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
  remainingParts: number;

  constructor(private _pickService: PickService) {
    this.boxes = [];
    this.orientation = 'horizontal';
  }

  ngOnInit() {
    if (this.boxes.length > 0) {
      this.boxes = this.items[this.currentItem].boxes;
      this.remainingParts = this.boxes.map(box => box.quantity).reduce((a, b) => a + b);
    }
  }

  ngOnChanges() {
    if (this.boxes ) {
      this.items = this.items[this.currentItem].boxes;
    }
    this.remainingParts = this.boxes.map(box => box.quantity).reduce((a, b) => a + b);
  }

  checkWagon() {

  }

  boxChanged($event) {
    this.remainingParts -= 0; // Enviar quantidade para subtrair
    if (this.remainingParts === 0) {
      this.getNextPart();
    }
  }

  getNextPart() {
    this.border = '20px solid limegreen';
    setTimeout(() => {
      this.border = '20px solid red';
      this._pickService.updateItem(this.currentItem);
    }, 500);
  }




}
