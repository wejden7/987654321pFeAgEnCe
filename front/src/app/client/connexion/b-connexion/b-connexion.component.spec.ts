import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BConnexionComponent } from './b-connexion.component';

describe('BConnexionComponent', () => {
  let component: BConnexionComponent;
  let fixture: ComponentFixture<BConnexionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BConnexionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
