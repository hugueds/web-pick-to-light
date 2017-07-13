import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Item } from "app/models/Item";

@Component({
  selector: 'part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})

export class PartComponent implements OnInit, OnChanges {

  defaultImage: string = 'assets/images/no-image.png';
  partPicture: string;

  @Input() items: Item[];
  @Input() currentItem: number;

  constructor() {
    this.currentItem = 0;
  }

  ngOnInit() {
    this.changePicture();    
  }

  ngOnChanges() {
  }

  changePicture() {
    if (this.partPicture == undefined) {
      this.partPicture = this.defaultImage;
    } else {
      this.partPicture = this.items[this.currentItem].photo;
    }
    return;
  }
}
