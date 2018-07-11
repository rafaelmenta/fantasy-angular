import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamPlayersComponent } from './admin-team-players.component';

describe('AdminTeamPlayersComponent', () => {
  let component: AdminTeamPlayersComponent;
  let fixture: ComponentFixture<AdminTeamPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTeamPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeamPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
