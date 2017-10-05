import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wagon-description',
  templateUrl: './wagon-description.component.html',
  styleUrls: ['./wagon-description.component.css']
})
export class WagonComponent implements OnInit {

  @Input() wagonId: any;
  @Input() stationName: string;


  constructor() { }

  ngOnInit() {
  }

}
