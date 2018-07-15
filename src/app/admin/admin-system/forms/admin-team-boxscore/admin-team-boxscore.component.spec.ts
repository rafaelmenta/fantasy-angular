import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamBoxscoreComponent } from './admin-team-boxscore.component';

describe('AdminTeamBoxscoreComponent', () => {
  let component: AdminTeamBoxscoreComponent;
  let fixture: ComponentFixture<AdminTeamBoxscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTeamBoxscoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeamBoxscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
