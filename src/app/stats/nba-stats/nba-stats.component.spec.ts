import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbaStatsComponent } from './nba-stats.component';

describe('NbaStatsComponent', () => {
  let component: NbaStatsComponent;
  let fixture: ComponentFixture<NbaStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbaStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbaStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
