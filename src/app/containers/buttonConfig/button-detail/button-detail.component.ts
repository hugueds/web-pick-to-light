import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import * as SHELF_CONFIG from '../../../shared/data/shelfconfig';
import { PickShelf } from '../../../models/PickShelf';
import { PickService } from '../../../services/pick.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shelf-detail',
  templateUrl: './button-detail.component.html',
  styleUrls: ['./button-detail.component.css']
})

export class ButtonDetailComponent implements OnInit, OnChanges {

  config = SHELF_CONFIG.SHELF_CONFIG;
  formButton = new PickShelf();
  buttons: PickShelf[];
  isEditMode = false;

  constructor(private _pickService: PickService,
    private _router: Router,
    private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.buttons = [];
    this.getButtons();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this._pickService.getButton(params['id']).subscribe((btn: any) => {
          this.formButton = btn;
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }


  getButtons() {
    this._pickService.getButtons().subscribe((btns: any[]) => this.buttons = btns);
  }

  getButtonsByPLC(plc: string) {
    this._pickService.getButtonsByPLC(plc).subscribe((buttons: PickShelf[]) => {
      this.buttons = buttons;
    });
  }

  save(button: PickShelf) {

    let offset = 0;

    if (this.isEditMode) {
      this.edit(button);
      return;
    }

    switch (button.plc) {
      case 'P27':
        offset = 0;
        break;
      case 'P30':
        offset = 3000;
        break;
      case 'SPARE_BOX':
        offset = 2000;
        break;
    }

    // Calcular o numero do id
    const id = (120 * button.controllerId) + button.buttonNode - 1 + offset;
    button.buttonId = id;


    this._pickService.saveButton(button).subscribe(data => {
      this._router.navigate(['button-config']);
    });

  }

  edit(button) {
    this._pickService.updateButton(button).subscribe(data => {
      this._router.navigate(['button-config']);
    });
  }


  clean() {

  }

  checkData(button: PickShelf) {
    if ((typeof button.buttonId) !== 'number') {
      return false;
    }

    for (let i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i].buttonId === button.buttonId) {
        const ans = confirm('ID já cadastrado, deseja cadastrar outro botão com mesmo ID?');
        return ans;
      }
    }
    return true;
  }

}
