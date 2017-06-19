import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  tablets: string[];
  selectedTablet : string;
  user: string = '';

  constructor() {
    this.tablets = []
    this.generateTabletList();
  }

  ngOnInit() {
  }

  saveChanges() {
    
  }

  generateTabletList() {
    for (let i = 1; i <= 10; i++) {
      if (i < 10) {
        this.tablets.push('TABLET0' + i);
      }
      else {
        this.tablets.push('TABLET' + i);        
      }
    }
  }

}
