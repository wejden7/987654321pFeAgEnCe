import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmrasComponent } from './omras.component';

describe('OmrasComponent', () => {
  let component: OmrasComponent;
  let fixture: ComponentFixture<OmrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
