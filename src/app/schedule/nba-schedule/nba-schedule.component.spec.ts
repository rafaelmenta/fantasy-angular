import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaScheduleComponent } from './nba-schedule.component';

describe('NbaScheduleComponent', () => {
  let component: NbaScheduleComponent;
  let fixture: ComponentFixture<NbaScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbaScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbaScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
