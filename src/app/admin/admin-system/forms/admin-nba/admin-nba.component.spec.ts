import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNbaComponent } from './admin-nba.component';

describe('AdminNbaComponent', () => {
  let component: AdminNbaComponent;
  let fixture: ComponentFixture<AdminNbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
