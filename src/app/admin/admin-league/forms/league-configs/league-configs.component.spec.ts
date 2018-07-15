import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueConfigsComponent } from './league-configs.component';

describe('LeagueConfigsComponent', () => {
  let component: LeagueConfigsComponent;
  let fixture: ComponentFixture<LeagueConfigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueConfigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
