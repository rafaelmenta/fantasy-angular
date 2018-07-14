import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNbaGameComponent } from './admin-nba-game.component';

describe('AdminNbaGameComponent', () => {
  let component: AdminNbaGameComponent;
  let fixture: ComponentFixture<AdminNbaGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNbaGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNbaGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
