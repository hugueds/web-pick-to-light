import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WagonBoxComponent } from './wagon-box.component';

describe('WagonBoxComponent', () => {
  let component: WagonBoxComponent;
  let fixture: ComponentFixture<WagonBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WagonBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WagonBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
