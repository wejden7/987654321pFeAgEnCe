import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelidClientComponent } from './hotelid-client.component';

describe('HotelidClientComponent', () => {
  let component: HotelidClientComponent;
  let fixture: ComponentFixture<HotelidClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelidClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelidClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
