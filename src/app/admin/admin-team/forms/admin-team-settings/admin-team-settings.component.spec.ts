import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamSettingsComponent } from './admin-team-settings.component';

describe('AdminTeamSettingsComponent', () => {
  let component: AdminTeamSettingsComponent;
  let fixture: ComponentFixture<AdminTeamSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTeamSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeamSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
