import { Component, OnInit, Inject, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { MissingPart } from '../../models/MissingPart';
import { Item } from '../../models/Item';

import { SockService } from '../../services/sock.service';
import { MissingPartService } from '../../services/missing-part.service';
import { PickService } from '../../services/pick.service';
import { Wagon } from '../../models/Wagon';

@Component({
  selector: 'app-missing-part',
  template: `
  <button md-fab (click)='openDialog()' >
    <img src='assets/images/forklift.png'/>
  </button>
  `,
  styleUrls: ['./missing-part.component.css']
})

export class MissingPartComponent implements OnInit {

  dialogRef;

  @Input() items;
  @Input() currentItem;

  constructor(
    private _dialog: MdDialog
    , private _mpService: MissingPartService
    , private _sockService: SockService
    , private _pickService: PickService) {

  }

  ngOnInit() {

  }

  openDialog() {

    //
    this.dialogRef = this._dialog.open(MissingPartDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      width: '70%',
      data: { part: this.items[this.currentItem].obj }
    });

    this.dialogRef.afterClosed().subscribe(part => {
      // this._mpService.sendMissingPart(result).subscribe(res => console.log(res))
      this._sockService.sendMissingPartMessage('dec-part', part);
    });
  }
}


@Component({
  selector: 'app-missing-part-dialog',
  templateUrl: './missing-part-dialog.component.html',
  styleUrls: ['./missing-part-dialog.component.css']
})

export class MissingPartDialogComponent {

  partMissing: MissingPart = new MissingPart();

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<MissingPartDialogComponent>,
  ) {
    this.partMissing.part = data.part;
  }

  send() {
    this.dialogRef.close(this.partMissing);
  }

}
