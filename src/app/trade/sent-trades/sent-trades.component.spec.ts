import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentTradesComponent } from './sent-trades.component';

describe('SentTradesComponent', () => {
  let component: SentTradesComponent;
  let fixture: ComponentFixture<SentTradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentTradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
