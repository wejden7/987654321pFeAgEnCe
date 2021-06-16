import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmraidComponent } from './omraid.component';

describe('OmraidComponent', () => {
  let component: OmraidComponent;
  let fixture: ComponentFixture<OmraidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmraidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmraidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
