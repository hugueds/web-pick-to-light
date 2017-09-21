import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PickService } from '../../services/pick.service';

import { Item } from "../../models/Item";

@Component({
  selector: 'part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})

export class PartComponent implements OnInit, OnChanges {

  defaultImage: string = 'assets/images/no-image.png';
  partPicture: string;
  hasImage: boolean = false;

  @Input() items: Item[];
  @Input() currentItem: number;

  constructor() { }

  ngOnInit() {
    this.changePicture()
  }

  ngOnChanges(changes) {   
    this.changePicture()
  }

  changePicture() {   
    if (!this.items[this.currentItem].photo) {
      this.hasImage = false;
      this.partPicture = this.defaultImage;
    } else {
      this.hasImage = true;
      this.partPicture = 'data:image/png;base64,' + this.items[this.currentItem].photo;
    }
  }

}
