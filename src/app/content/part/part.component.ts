import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})

export class PartComponent implements OnInit, OnChanges {

  defaultImage:string = 'assets/images/no-image.png';
  partPicture: string;

  @Input() items: any[];
  @Input() currentItem: number;

  constructor() { 
    this.currentItem = 0;
  }

  ngOnInit() {
    if (this.partPicture == undefined){
      this.partPicture = this.defaultImage;
    }    
  }

  ngOnChanges(){
    
  }

}
