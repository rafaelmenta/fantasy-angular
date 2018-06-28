import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftOverviewComponent } from './draft-overview.component';

describe('DraftOverviewComponent', () => {
  let component: DraftOverviewComponent;
  let fixture: ComponentFixture<DraftOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
