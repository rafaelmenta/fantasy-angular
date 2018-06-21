import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerLastGamesComponent } from './player-last-games.component';

describe('PlayerLastGamesComponent', () => {
  let component: PlayerLastGamesComponent;
  let fixture: ComponentFixture<PlayerLastGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerLastGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerLastGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
