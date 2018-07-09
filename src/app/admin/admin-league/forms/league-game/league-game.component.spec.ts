import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueGameComponent } from './league-game.component';

describe('LeagueGameComponent', () => {
  let component: LeagueGameComponent;
  let fixture: ComponentFixture<LeagueGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
