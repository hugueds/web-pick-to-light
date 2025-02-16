import { Component, OnInit, OnDestroy } from '@angular/core';
import { PickService } from '../../services/pick.service';

@Component({
  selector: 'app-opk',
  templateUrl: './opk.component.html',
  styleUrls: ['./opk.component.css']
})

export class OpkComponent implements OnInit, OnDestroy {

  headers = ['PEÇA', 'ID DO POSTO', 'EDITAR', 'APAGAR'];
  opks = [];
  subscriber;

  constructor(private _pickService: PickService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.subscriber = this._pickService.getAllOpks()
    .subscribe((opks: any[]) => this.opks = opks);
  }

  delete(opk) {
    this._pickService.deleteOpk(opk)
    .subscribe(data => this.getAll());
  }

  refresh() {
    this.getAll();
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}
