import { TestBed, inject } from '@angular/core/testing';

import { TradeService } from './trade.service';

describe('TradeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradeService]
    });
  });

  it('should be created', inject([TradeService], (service: TradeService) => {
    expect(service).toBeTruthy();
  }));
});