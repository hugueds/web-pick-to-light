import { Component, OnInit } from '@angular/core';

import { PickShelf } from '../models/PickShelf';
import { PickService } from '../services/pick.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'shelf-detail',
  templateUrl: './shelf-detail.component.html',
  styleUrls: ['./shelf-config.component.css']
})
export class ShelfDetailComponent implements OnInit {

  formButton: PickShelf = new PickShelf();
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
        this._pickService.getButton(params['buttonId']).subscribe(btn => {
          this.formButton = btn;
        });
      }
    });
  }

  getButtons() {
    this._pickService.getButtons().subscribe(btns => this.buttons = btns);
  }

  save(button: PickShelf, f: NgForm) {

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
        return false;
      }
    }
    return true;
  }

}
