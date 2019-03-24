import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlPickerComponent } from './sl-picker.component';

describe('SlPickerComponent', () => {
  let component: SlPickerComponent;
  let fixture: ComponentFixture<SlPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
