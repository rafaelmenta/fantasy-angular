import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerLookupComponent } from './player-lookup.component';

describe('PlayerLookupComponent', () => {
  let component: PlayerLookupComponent;
  let fixture: ComponentFixture<PlayerLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerLookupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
