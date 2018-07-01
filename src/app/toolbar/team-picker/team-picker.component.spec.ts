import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPickerComponent } from './team-picker.component';

describe('TeamPickerComponent', () => {
  let component: TeamPickerComponent;
  let fixture: ComponentFixture<TeamPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
