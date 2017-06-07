import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {

  @Input() items: any[];
  @Input() currentItem: number;

  constructor() { 
    this.currentItem = 0;
  }

  ngOnInit() {
  }

}
