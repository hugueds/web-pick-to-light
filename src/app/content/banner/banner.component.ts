import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: `
  <div class='banner' >
    <span class='banner-content'>CARREGANDO <br/> PRÓXIMO COMBOIO...</span>
  </div>
  <md-spinner color='primary'> </md-spinner>
  `,
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
