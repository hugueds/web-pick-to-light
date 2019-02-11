import { Component, OnInit, Input } from '@angular/core';
import { PopidList } from '../../../models/PopidList';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-wagon-container-popid',
  templateUrl: './wagon-container-popid.component.html',
  styleUrls: ['./wagon-container-popid.component.css']
})
export class WagonContainerPopidComponent implements OnInit, OnChanges {

  @Input()  popidList: PopidList[];
  @Input() currentPopidSequence = 0;

  popid: PopidList;

  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.popid = this.popidList[this.currentPopidSequence];
    console.log(this.popid);
  }

}
