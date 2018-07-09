import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeagueComponent } from './admin-league.component';

describe('AdminLeagueComponent', () => {
  let component: AdminLeagueComponent;
  let fixture: ComponentFixture<AdminLeagueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLeagueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
