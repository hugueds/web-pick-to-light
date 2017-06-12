import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from "@angular/material";

@Component({
  selector: 'missing-part',
  templateUrl: './missing-part.component.html',
  styleUrls: ['./missing-part.component.css']
})
export class MissingPartComponent implements OnInit {

  constructor(private _dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog(){
    let dialogRef = this._dialog.open(MissingPartDialogComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe( result => {
      console.log(result);
    });
  }

}

@Component({
  selector : 'missing-part-dialog',
  templateUrl : './missing-part-dialog.component.html',
  styleUrls: ['./missing-part-dialog.component.css']  
})

export class MissingPartDialogComponent{

  constructor(public dialogRef: MdDialogRef<MissingPartDialogComponent>){}

}
