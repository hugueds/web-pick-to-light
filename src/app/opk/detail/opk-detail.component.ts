import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { PickService } from '../../services/pick.service';

@Component({
  selector: 'opk-detail',
  templateUrl: './opk-detail.component.html',
  styleUrls: ['../opk.component.css']
})
export class OpkDetailComponent implements OnInit {
  
  formOpk: any = { partNumber: 0, stationId: 0};
  opks: any[];
  isEditMode: boolean = false;

  constructor(private _pickService: PickService,
    private _router: Router,
    private route: ActivatedRoute) {        
  }


  ngOnInit() {    
    this.getOpks();
    this.route.params.subscribe(params => {
      if (params['partNumber']) {
        this.isEditMode = true;
        this._pickService.getOpk(params['partNumber']).subscribe(opk => {
          this.formOpk = opk;
        })
      }
    })
  }

  getOpks() {
    this._pickService.getAllOpks().subscribe(opks => this.opks = opks);
  }

  save(opk, f: NgForm) {

    if (this.isEditMode) {
      this.edit(opk);
      return;
    }

    if (!this.checkData(opk)) {
      return console.log('Invalid Data');
    }

    this._pickService.saveOpk(opk).subscribe(data => {
      this._router.navigate(['opk'])      
    })

  }

  edit(opk) {
    this._pickService.updateOpk(opk).subscribe(data => {      
      this._router.navigate(['opk'])
    })
  }

  
  clean() {

  }

  checkData(opk) {
    for (let i = 0; i < this.opks.length; i++) {
      if (this.opks[i].partNumber == opk.partNumber) {
        return false;
      }
    }
    return true;
  }

}
