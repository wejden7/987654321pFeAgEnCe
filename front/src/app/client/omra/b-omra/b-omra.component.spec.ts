import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BOmraComponent } from './b-omra.component';

describe('BOmraComponent', () => {
  let component: BOmraComponent;
  let fixture: ComponentFixture<BOmraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BOmraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BOmraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
