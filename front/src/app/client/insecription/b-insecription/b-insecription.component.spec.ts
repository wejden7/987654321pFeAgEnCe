import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BInsecriptionComponent } from './b-insecription.component';

describe('BInsecriptionComponent', () => {
  let component: BInsecriptionComponent;
  let fixture: ComponentFixture<BInsecriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BInsecriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BInsecriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
