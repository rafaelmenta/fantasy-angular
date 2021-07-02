import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBidFormComponent } from './player-bid-form.component';

describe('PlayerBidFormComponent', () => {
  let component: PlayerBidFormComponent;
  let fixture: ComponentFixture<PlayerBidFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerBidFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBidFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
