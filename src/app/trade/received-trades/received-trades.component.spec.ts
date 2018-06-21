import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedTradesComponent } from './received-trades.component';

describe('ReceivedTradesComponent', () => {
  let component: ReceivedTradesComponent;
  let fixture: ComponentFixture<ReceivedTradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedTradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
