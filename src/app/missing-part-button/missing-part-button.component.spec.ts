import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingPartButtonComponent } from './missing-part-button.component';

describe('MissingPartButtonComponent', () => {
  let component: MissingPartButtonComponent;
  let fixture: ComponentFixture<MissingPartButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingPartButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingPartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
