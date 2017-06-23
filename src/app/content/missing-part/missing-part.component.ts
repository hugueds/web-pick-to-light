import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'missing-part',
  templateUrl: './missing-part.component.html',
  styleUrls: ['./missing-part.component.css']
})

export class MissingPartComponent implements OnInit {

  dialogRef;

  constructor(private _dialog: MdDialog) { }
  ngOnInit() {
  }  

  openDialog() {

    //Buscar qual é a peça atual
    //Fazer a busca de qual modulo e buffer a peça esta sendo utilizada       

    this.dialogRef = this._dialog.open(MissingPartDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      width: '60%',
      data: { part: 123456789 }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });    
    

  }



}

@Component({
  selector: 'missing-part-dialog',
  templateUrl: './missing-part-dialog.component.html',
  styleUrls: ['./missing-part-dialog.component.css']
})

export class MissingPartDialogComponent {

  

  constructor(
    @Inject(MD_DIALOG_DATA) public data:any,
    public dialogRef: MdDialogRef<MissingPartDialogComponent>
  ) { }

  send(data){
      this.dialogRef.close(data)      
  }

}
