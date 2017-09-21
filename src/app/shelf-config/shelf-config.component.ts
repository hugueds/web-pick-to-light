import { Component, OnInit, OnDestroy } from '@angular/core';

import { PickShelf } from '../models/PickShelf';
import { PickService } from '../services/pick.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shelf-config',
  templateUrl: './shelf-config.component.html',
  styleUrls: ['./shelf-config.component.css']
})
export class ShelfConfigComponent implements OnInit, OnDestroy {

  formButton: PickShelf = new PickShelf();
  buttons: PickShelf[];
  headers: string[] = [
    'ID UNICO', 'CONTROLADORA', 'NUMERO', 'PEÇA', 'ID DO POSTO', 'COR', 'EDITAR', 'APAGAR'
  ];

  constructor(private _pickService: PickService) { }

  ngOnInit() {
    this.buttons = [];
    this.getButtons();    
    setTimeout(() => {
      let table = document.getElementsByClassName('container')[0];
      let scroll = localStorage.getItem('scrollPosition');
      table.scrollTop = parseInt(scroll);
    }, 100);
  }

  ngOnDestroy() {
    let table = document.getElementsByClassName('container')[0];
    let scroll = table.scrollTop.toString();
    localStorage.setItem('scrollPosition', scroll);    
  }

  getButtons() {
    this._pickService.getButtons().subscribe(btns => this.buttons = btns);      
  }

  refresh() {
    this.getButtons();
  }

  delete(button) {
    this._pickService.deleteButton(button).subscribe(data => {
      this.getButtons();
    })
  }

  


}
