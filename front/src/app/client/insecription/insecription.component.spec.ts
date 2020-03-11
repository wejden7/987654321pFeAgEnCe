import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsecriptionComponent } from './insecription.component';

describe('InsecriptionComponent', () => {
  let component: InsecriptionComponent;
  let fixture: ComponentFixture<InsecriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsecriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsecriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
