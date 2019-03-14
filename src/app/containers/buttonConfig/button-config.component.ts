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
  controllers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  buttons: PickShelf[] = [];
  filteredButtons: PickShelf[] = [];
  searchTerm = {
    plc: 'P27',
    controller: 0
  };
  formButton: PickShelf = new PickShelf();
  headers: string[] = [
    'PLC', 'ID', 'CONTROLADORA', 'NUMERO', 'PEÇA', 'ID DO POSTO', 'COR', 'DIREÇÃO', 'EDITAR', 'APAGAR'
  ];

  colors = {
    '0': 'Vermelho',
    '1': 'Verde',
    '2': 'Amarelo',
    '3': 'Cyan',
    '4': 'Rosa',
    '5': 'Azul'
  };

  constructor(private _pickService: PickService) { }


  ngOnInit() {
    this.getButtonsByPLC(this.searchTerm.plc);
    setTimeout(() => {
      const table = document.getElementsByClassName('table-container')[0];
      const scroll = localStorage.getItem('scrollPosition');
      table.scrollTop = parseInt(scroll, 10);
    }, 200);
  }


  ngOnDestroy() {
    const table = document.getElementsByClassName('table-container')[0];
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
      const sortedButtons = btns.sort((a, b) => a.buttonId - b.buttonId);
      // sortedButtons = sortedButtons.sort((a, b) => a.controllerId - b.controllerId);
      // sortedButtons = sortedButtons.sort((a, b) => a.buttonNode - b.buttonNode);
      this.buttons = [...sortedButtons];
      this.filteredButtons = [...sortedButtons];
    });
  }

  getButtonsByController(controller: number) {
    console.log(controller);
    const filteredButtons = this.buttons.filter((b) => b.controllerId === controller);
    this.filteredButtons = [...filteredButtons];
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
