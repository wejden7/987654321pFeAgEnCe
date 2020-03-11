import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RVolComponent } from './r-vol.component';

describe('RVolComponent', () => {
  let component: RVolComponent;
  let fixture: ComponentFixture<RVolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RVolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RVolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
