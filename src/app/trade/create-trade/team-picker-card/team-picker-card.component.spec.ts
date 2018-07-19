import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPickerCardComponent } from './team-picker-card.component';

describe('TeamPickerCardComponent', () => {
  let component: TeamPickerCardComponent;
  let fixture: ComponentFixture<TeamPickerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPickerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPickerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
