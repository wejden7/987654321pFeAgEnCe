import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRechercheComponent } from './h-recherche.component';

describe('HRechercheComponent', () => {
  let component: HRechercheComponent;
  let fixture: ComponentFixture<HRechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRechercheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
