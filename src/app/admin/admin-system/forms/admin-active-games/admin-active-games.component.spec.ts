import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActiveGamesComponent } from './admin-active-games.component';

describe('AdminActiveGamesComponent', () => {
  let component: AdminActiveGamesComponent;
  let fixture: ComponentFixture<AdminActiveGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminActiveGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActiveGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
