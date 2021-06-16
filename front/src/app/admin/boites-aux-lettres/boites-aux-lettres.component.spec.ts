import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoitesAuxLettresComponent } from './boites-aux-lettres.component';

describe('BoitesAuxLettresComponent', () => {
  let component: BoitesAuxLettresComponent;
  let fixture: ComponentFixture<BoitesAuxLettresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoitesAuxLettresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoitesAuxLettresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
