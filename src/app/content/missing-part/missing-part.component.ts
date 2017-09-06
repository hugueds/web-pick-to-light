import { Component, OnInit, Inject, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from "@angular/material";

import { MissingPart } from "app/models/MissingPart";
import { Item } from "app/models/Item";

import { SockService } from "app/services/sock.service";
import { MissingPartService } from "app/services/missing-part.service";
import { PickService } from "app/services/pick.service";
import { Wagon } from "app/models/Wagon";

@Component({
  selector: 'missing-part',
  templateUrl: './missing-part.component.html',
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
    //Buscar qual é a peça atual
    //Fazer a busca de qual modulo e buffer a peça esta sendo utilizada         
    this.dialogRef = this._dialog.open(MissingPartDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      width: '65%',
      data: { part : this.items[this.currentItem].obj }
    });

    this.dialogRef.afterClosed().subscribe(part => {
      // this._mpService.sendMissingPart(result).subscribe(res => console.log(res))
       this._sockService.sendMessage('dec-part', part)
    });
  }
}


@Component({
  selector: 'missing-part-dialog',
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
