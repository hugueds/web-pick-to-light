import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import * as SHELF_CONFIG from '../shared/data/shelfconfig';
import { PickShelf } from '../models/PickShelf';
import { PickService } from '../services/pick.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shelf-detail',
  templateUrl: './shelf-detail.component.html',
  styleUrls: ['./shelf-config.component.css']
})

export class ShelfDetailComponent implements OnInit, OnChanges {

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
      if (params['buttonId']) {
        this.isEditMode = true;
        this._pickService.getButton(params['buttonId']).subscribe((btn: any) => {
          this.formButton = btn;
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  test(a) {
    console.log(a);
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

    if (this.isEditMode) {
      this.edit(button);
      return;
    }

    if (!this.checkData(button)) {
      return console.log('Invalid Data');
    }

    this._pickService.saveButton(button).subscribe(data => {
      this._router.navigate(['shelf-config']);
    });

  }

  edit(button) {
    this._pickService.updateButton(button).subscribe(data => {
      this._router.navigate(['shelf-config']);
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
        alert('ID já cadastrado');
        return false;
      }
    }
    return true;
  }

}
