import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueInfoComponent } from './league-info.component';

describe('LeagueInfoComponent', () => {
  let component: LeagueInfoComponent;
  let fixture: ComponentFixture<LeagueInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
