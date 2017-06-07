import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wagon',
  templateUrl: './wagon.component.html',
  styleUrls: ['./wagon.component.css']
})
export class WagonComponent implements OnInit {

  @Input() wagonId : any;

  constructor() { }

  ngOnInit() {
  }

}
