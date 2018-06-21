import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextTeamGamesComponent } from './next-team-games.component';

describe('NextTeamGamesComponent', () => {
  let component: NextTeamGamesComponent;
  let fixture: ComponentFixture<NextTeamGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextTeamGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextTeamGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
