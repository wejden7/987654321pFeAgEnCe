import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BContactComponent } from './b-contact.component';

describe('BContactComponent', () => {
  let component: BContactComponent;
  let fixture: ComponentFixture<BContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
