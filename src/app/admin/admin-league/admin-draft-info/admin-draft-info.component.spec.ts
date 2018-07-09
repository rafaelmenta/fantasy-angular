import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDraftInfoComponent } from './admin-draft-info.component';

describe('AdminDraftInfoComponent', () => {
  let component: AdminDraftInfoComponent;
  let fixture: ComponentFixture<AdminDraftInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDraftInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDraftInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
