import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WagonContainerComponent } from './wagon-container.component';

describe('WagonContainerComponent', () => {
  let component: WagonContainerComponent;
  let fixture: ComponentFixture<WagonContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WagonContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WagonContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
