import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueConferenceComponent } from './league-conference.component';

describe('LeagueConferenceComponent', () => {
  let component: LeagueConferenceComponent;
  let fixture: ComponentFixture<LeagueConferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueConferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueConferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
