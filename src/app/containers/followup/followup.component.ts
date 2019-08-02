import { Component, OnInit, OnDestroy } from '@angular/core';
import { PickShelf } from '../../models/PickShelf';
import { SockService } from '../../services/sock.service';

@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.css']
})

export class FollowUpComponent implements OnInit, OnDestroy {

  MAX_SIZE = 20;
  lastButtons: PickShelf[] = [];
  sockSubscriber;

  constructor(private _sockService: SockService) {
  }

  ngOnInit() {
    this.sockSubscriber = this._sockService.getMessageFromPick('button pressed').subscribe((button: PickShelf) => {
      const size = this.lastButtons.length;
      if (size > this.MAX_SIZE) {
        this.lastButtons.shift();
      }
      this.lastButtons.push(button);

    });
  }

  clearList() {
    this.lastButtons = [];
  }

  ngOnDestroy(): void {
    this.sockSubscriber = null;
  }

}

