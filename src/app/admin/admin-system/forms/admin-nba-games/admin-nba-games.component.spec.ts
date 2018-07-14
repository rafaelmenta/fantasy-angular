import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNbaGamesComponent } from './admin-nba-games.component';

describe('AdminNbaGamesComponent', () => {
  let component: AdminNbaGamesComponent;
  let fixture: ComponentFixture<AdminNbaGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNbaGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNbaGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
