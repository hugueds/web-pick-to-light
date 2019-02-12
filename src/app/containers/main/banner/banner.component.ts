import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: `
  <div class="banner-container" >
    <div class="no-wagon" *ngIf="noWagons">
      NÃO HÁ MAIS COMBOIOS DISPONÍVEIS PARA CARREGAMENTO
    </div>
    <div class='banner' *ngIf="!noWagons" >
      <span class='banner-content'>CARREGANDO <br/> PRÓXIMO COMBOIO...</span>
    </div>
    <mat-spinner color='primary'> </mat-spinner>
  </div>
  `,
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit {

  @Input() noWagons: any;

  constructor() { }

  ngOnInit() {
  }

}
