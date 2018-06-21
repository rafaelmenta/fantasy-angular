import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesChartComponent } from './minutes-chart.component';

describe('MinutesChartComponent', () => {
  let component: MinutesChartComponent;
  let fixture: ComponentFixture<MinutesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinutesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
