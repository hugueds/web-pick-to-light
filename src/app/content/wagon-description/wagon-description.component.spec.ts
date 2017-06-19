import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('WagonComponent', () => {
  let component: WagonComponent;
  let fixture: ComponentFixture<WagonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WagonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WagonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
