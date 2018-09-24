import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { PickShelf } from '../models/PickShelf';
import { PickService } from '../services/pick.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shelf-config',
  templateUrl: './shelf-config.component.html',
  styleUrls: ['./shelf-config.component.css']
})
export class ShelfConfigComponent implements OnInit, OnDestroy, OnChanges {


  searchTerm: any = {};
  formButton: PickShelf = new PickShelf();
  buttons: PickShelf[];
  headers: string[] = [
    'PLC', 'ID UNICO', 'CONTROLADORA', 'NUMERO', 'PEÇA', 'ID DO POSTO', 'COR', 'EDITAR', 'APAGAR'
  ];

  constructor(private _pickService: PickService) { }

  ngOnInit() {
    this.buttons = [];
    this.getButtons();
    setTimeout(() => {
      const table = document.getElementsByClassName('container')[0];
      const scroll = localStorage.getItem('scrollPosition');
      table.scrollTop = parseInt(scroll, 10);
    }, 100);
  }

  ngOnChanges(change) {
    console.log(change);
  }

  ngOnDestroy() {
    const table = document.getElementsByClassName('container')[0];
    const scroll = table.scrollTop.toString();
    localStorage.setItem('scrollPosition', scroll);
  }

  find() {

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
    });
  }

}
