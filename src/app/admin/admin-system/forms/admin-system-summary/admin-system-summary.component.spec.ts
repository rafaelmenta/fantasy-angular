import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSystemSummaryComponent } from './admin-system-summary.component';

describe('AdminSystemSummaryComponent', () => {
  let component: AdminSystemSummaryComponent;
  let fixture: ComponentFixture<AdminSystemSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSystemSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSystemSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
