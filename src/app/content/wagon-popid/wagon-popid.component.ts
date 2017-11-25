import { Component, OnInit, Input } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { PopidList } from '../../models/PopidList';

@Component({
  selector: 'app-wagon-popid',
  templateUrl: './wagon-popid.component.html',
  styleUrls: ['./wagon-popid.component.css']
})
export class WagonPopidComponent implements OnInit, OnChanges {

  @Input() popidList: PopidList;
  @Input() currentPopidSequence = 0;
  @Input() wagonLength = 0;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {

  }

}
