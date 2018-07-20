import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeAgencyListComponent } from './free-agency-list.component';

describe('FreeAgencyListComponent', () => {
  let component: FreeAgencyListComponent;
  let fixture: ComponentFixture<FreeAgencyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeAgencyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeAgencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
