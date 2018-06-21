import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTeamGamesComponent } from './recent-team-games.component';

describe('RecentTeamGamesComponent', () => {
  let component: RecentTeamGamesComponent;
  let fixture: ComponentFixture<RecentTeamGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentTeamGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentTeamGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
