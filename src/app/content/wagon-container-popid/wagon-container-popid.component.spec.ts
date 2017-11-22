import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WagonContainerPopidComponent } from './wagon-container-popid.component';

describe('WagonContainerPopidComponent', () => {
  let component: WagonContainerPopidComponent;
  let fixture: ComponentFixture<WagonContainerPopidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WagonContainerPopidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WagonContainerPopidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
