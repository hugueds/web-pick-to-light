import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfConfigComponent } from './shelf-config.component';

describe('ShelfConfigComponent', () => {
  let component: ShelfConfigComponent;
  let fixture: ComponentFixture<ShelfConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelfConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
