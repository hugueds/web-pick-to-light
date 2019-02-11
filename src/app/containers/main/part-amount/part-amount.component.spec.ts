import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartAmountComponent } from './part-amount.component';

describe('PartAmountComponent', () => {
  let component: PartAmountComponent;
  let fixture: ComponentFixture<PartAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
