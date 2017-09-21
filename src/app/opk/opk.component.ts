import { Component, OnInit } from '@angular/core';
import { PickService } from '../services/pick.service';

@Component({
  selector: 'opk',
  templateUrl: './opk.component.html',
  styleUrls: ['./opk.component.css']
})
export class OpkComponent implements OnInit {

  headers = ['PEÇA', 'ID DO POSTO', 'EDITAR', 'APAGAR'];
  opks = [];
  subscriber;

  constructor(private _pickService: PickService) { }

  ngOnInit() {
    this.getAll();
  }


  getAll(){
    this.subscriber = this._pickService.getAllOpks().subscribe( opks => this.opks = opks);
  }
  
  delete(opk){
    this._pickService.deleteOpk(opk).subscribe( data => this.getAll());
  }

  refresh(){
    this.getAll();
  }


  ngOnDestroy(){
    this.subscriber.unsubscribe();
  }

}
