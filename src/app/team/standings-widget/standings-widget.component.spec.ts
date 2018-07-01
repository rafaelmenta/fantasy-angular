import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingsWidgetComponent } from './standings-widget.component';

describe('StandingsWidgetComponent', () => {
  let component: StandingsWidgetComponent;
  let fixture: ComponentFixture<StandingsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandingsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
