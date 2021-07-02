import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionPanelComponent } from './auction-panel.component';

describe('AuctionPanelComponent', () => {
  let component: AuctionPanelComponent;
  let fixture: ComponentFixture<AuctionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
