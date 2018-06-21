import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRankingComponent } from './team-ranking.component';

describe('TeamRankingComponent', () => {
  let component: TeamRankingComponent;
  let fixture: ComponentFixture<TeamRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
