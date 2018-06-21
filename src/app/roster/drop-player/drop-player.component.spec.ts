import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropPlayerComponent } from './drop-player.component';

describe('DropPlayerComponent', () => {
  let component: DropPlayerComponent;
  let fixture: ComponentFixture<DropPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
