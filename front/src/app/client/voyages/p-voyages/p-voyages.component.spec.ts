import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PVoyagesComponent } from './p-voyages.component';

describe('PVoyagesComponent', () => {
  let component: PVoyagesComponent;
  let fixture: ComponentFixture<PVoyagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PVoyagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PVoyagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
