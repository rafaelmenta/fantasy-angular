import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableAuctionPlayersComponent } from './available-auction-players.component';

describe('AvailableAuctionPlayersComponent', () => {
  let component: AvailableAuctionPlayersComponent;
  let fixture: ComponentFixture<AvailableAuctionPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableAuctionPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableAuctionPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
