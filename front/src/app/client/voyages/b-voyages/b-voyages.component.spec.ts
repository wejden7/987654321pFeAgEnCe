import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BVoyagesComponent } from './b-voyages.component';

describe('BVoyagesComponent', () => {
  let component: BVoyagesComponent;
  let fixture: ComponentFixture<BVoyagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BVoyagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BVoyagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
