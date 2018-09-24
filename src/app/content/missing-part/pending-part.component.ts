import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MissingPart } from '../../models/MissingPart';
import { Item } from '../../models/Item';

import { SockService } from '../../services/sock.service';
import { MissingPartService } from '../../services/missing-part.service';
import { PickService } from '../../services/pick.service';
import { Wagon } from '../../models/Wagon';

@Component({
  selector: 'app-pending-part',
  template: `
  <button md-fab class="pending-part-button" >
    FALTANTE
  </button>
  `,
  styleUrls: ['./missing-part.component.css']
})

export class PendingPartComponent implements OnInit {

  @Input() items;
  @Input() currentItem;

  constructor() {

  }

  ngOnInit() {

  }


}


