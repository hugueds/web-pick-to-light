import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingPartComponent } from './missing-part.component';

describe('MissingPartComponent', () => {
  let component: MissingPartComponent;
  let fixture: ComponentFixture<MissingPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
