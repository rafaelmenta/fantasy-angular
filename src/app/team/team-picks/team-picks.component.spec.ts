import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPicksComponent } from './team-picks.component';

describe('TeamPicksComponent', () => {
  let component: TeamPicksComponent;
  let fixture: ComponentFixture<TeamPicksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPicksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
