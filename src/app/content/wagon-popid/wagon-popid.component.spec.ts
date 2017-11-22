import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WagonPopidComponent } from './wagon-popid.component';

describe('WagonPopidComponent', () => {
  let component: WagonPopidComponent;
  let fixture: ComponentFixture<WagonPopidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WagonPopidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WagonPopidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
