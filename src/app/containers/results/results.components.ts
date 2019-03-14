import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

}
