import { TestBed, inject } from '@angular/core/testing';

import { GameNbaService } from './game-nba.service';

describe('GameNbaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameNbaService]
    });
  });

  it('should be created', inject([GameNbaService], (service: GameNbaService) => {
    expect(service).toBeTruthy();
  }));
});
