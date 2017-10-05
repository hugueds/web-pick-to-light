import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Item } from '../../models/Item';
import { Box } from '../../models/Box';

@Component({
  selector: 'app-part-amount',
  templateUrl: './part-amount.component.html',
  styleUrls: ['./part-amount.component.css']
})
export class PartAmountComponent implements OnInit, OnChanges {

  @Input() items: Item[];
  @Input() currentItem: number;

  amount: number;

  constructor() {
    this.currentItem = 0;
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.getAmount(this.currentItem);
  }

  getAmount(item) {
    this.amount = this.items[item].boxes.map(a => a.quantity).reduce((b, c) => b + c);
  }

}
