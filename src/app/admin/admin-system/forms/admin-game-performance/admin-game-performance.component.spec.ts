import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGamePerformanceComponent } from './admin-game-performance.component';

describe('AdminGamePerformanceComponent', () => {
  let component: AdminGamePerformanceComponent;
  let fixture: ComponentFixture<AdminGamePerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGamePerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGamePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
