import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeTeamComponent } from './trade-team.component';

describe('TradeTeamComponent', () => {
  let component: TradeTeamComponent;
  let fixture: ComponentFixture<TradeTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
