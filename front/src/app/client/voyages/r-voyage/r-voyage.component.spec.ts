import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RVoyageComponent } from './r-voyage.component';

describe('RVoyageComponent', () => {
  let component: RVoyageComponent;
  let fixture: ComponentFixture<RVoyageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RVoyageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RVoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
