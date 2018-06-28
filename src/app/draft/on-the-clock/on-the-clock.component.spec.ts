import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnTheClockComponent } from './on-the-clock.component';

describe('OnTheClockComponent', () => {
  let component: OnTheClockComponent;
  let fixture: ComponentFixture<OnTheClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnTheClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnTheClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
