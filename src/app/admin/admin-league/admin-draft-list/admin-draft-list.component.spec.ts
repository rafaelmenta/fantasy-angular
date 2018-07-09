import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDraftListComponent } from './admin-draft-list.component';

describe('AdminDraftListComponent', () => {
  let component: AdminDraftListComponent;
  let fixture: ComponentFixture<AdminDraftListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDraftListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDraftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
