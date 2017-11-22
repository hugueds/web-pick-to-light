import { Component, OnInit, Input } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-wagon-popid',
  templateUrl: './wagon-popid.component.html',
  styleUrls: ['./wagon-popid.component.css']
})
export class WagonPopidComponent implements OnInit, OnChanges {
  

  @Input() popid = '';

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
  }

}
