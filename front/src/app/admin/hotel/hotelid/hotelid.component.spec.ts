import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelidComponent } from './hotelid.component';

describe('HotelidComponent', () => {
  let component: HotelidComponent;
  let fixture: ComponentFixture<HotelidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
