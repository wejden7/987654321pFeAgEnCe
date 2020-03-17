import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyagebyidComponent } from './voyagebyid.component';

describe('VoyagebyidComponent', () => {
  let component: VoyagebyidComponent;
  let fixture: ComponentFixture<VoyagebyidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyagebyidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoyagebyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
