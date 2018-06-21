import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerNextGamesComponent } from './player-next-games.component';

describe('PlayerNextGamesComponent', () => {
  let component: PlayerNextGamesComponent;
  let fixture: ComponentFixture<PlayerNextGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerNextGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerNextGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
