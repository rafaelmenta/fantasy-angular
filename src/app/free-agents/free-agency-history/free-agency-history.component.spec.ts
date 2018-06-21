import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeAgencyHistoryComponent } from './free-agency-history.component';

describe('FreeAgencyHistoryComponent', () => {
  let component: FreeAgencyHistoryComponent;
  let fixture: ComponentFixture<FreeAgencyHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeAgencyHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeAgencyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
