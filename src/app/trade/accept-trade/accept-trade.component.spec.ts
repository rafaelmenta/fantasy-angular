import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptTradeComponent } from './accept-trade.component';

describe('AcceptTradeComponent', () => {
  let component: AcceptTradeComponent;
  let fixture: ComponentFixture<AcceptTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
