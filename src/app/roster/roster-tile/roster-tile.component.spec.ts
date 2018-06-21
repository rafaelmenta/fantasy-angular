import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterTileComponent } from './roster-tile.component';

describe('RosterTileComponent', () => {
  let component: RosterTileComponent;
  let fixture: ComponentFixture<RosterTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
