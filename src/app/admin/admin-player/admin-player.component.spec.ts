import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlayerComponent } from './admin-player.component';

describe('AdminPlayerComponent', () => {
  let component: AdminPlayerComponent;
  let fixture: ComponentFixture<AdminPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
