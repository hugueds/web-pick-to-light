import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as SHELF_CONFIG from '../../shared/data/shelfconfig';

import { PickShelf } from '../../models/PickShelf';
import { PickService } from '../../services/pick.service';

@Component({
  selector: 'app-shelf-config',
  templateUrl: './button-config.component.html',
  styleUrls: ['./button-config.component.css']
})

export class ButtonConfigComponent implements OnInit, OnDestroy {

  config = SHELF_CONFIG.SHELF_CONFIG;
  selectedPLC = 'P27';
  plcs = [];
  buttons: PickShelf[] = [];
  searchTerm: any = {};
  formButton: PickShelf = new PickShelf();
  headers: string[] = [
    'PLC', 'ID', 'CONTROLADORA', 'NUMERO', 'PEÇA', 'ID DO POSTO', 'COR', 'DIREÇÃO', 'EDITAR', 'APAGAR'
  ];

  constructor(private _pickService: PickService) { }


  ngOnInit() {
    this.getButtonsByPLC(this.selectedPLC);
    setTimeout(() => {
      const table = document.getElementsByClassName('container')[0];
      const scroll = localStorage.getItem('scrollPosition');
      table.scrollTop = parseInt(scroll, 10);
    }, 200);
  }


  ngOnDestroy() {
    const table = document.getElementsByClassName('container')[0];
    const scroll = table.scrollTop.toString();
    localStorage.setItem('scrollPosition', scroll);
  }

  find() {

  }


  getButtons() {
    this._pickService.getButtons().subscribe((btns: PickShelf[]) => {
      this.buttons = btns
        .sort((a, b) => a.buttonId - b.buttonId)
        .sort((a, b) => a.controllerId - b.controllerId)
        .sort((a, b) => a.buttonNode - b.buttonNode);
    });
  }

  getButtonsByPLC(plc: string) {
    this._pickService.getButtonsByPLC(plc).subscribe((btns: PickShelf[]) => {
      this.buttons = btns.sort((a, b) => a.buttonId - b.buttonId);
    });
  }


  refresh() {
    this.getButtonsByPLC(this.selectedPLC);
  }

  delete(button) {
    this._pickService.deleteButton(button).subscribe(data => {
      this.getButtonsByPLC(this.selectedPLC);
    });
  }

}
