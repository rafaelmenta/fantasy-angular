import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlayerSettingsComponent } from './admin-player-settings.component';

describe('AdminPlayerSettingsComponent', () => {
  let component: AdminPlayerSettingsComponent;
  let fixture: ComponentFixture<AdminPlayerSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPlayerSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlayerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
