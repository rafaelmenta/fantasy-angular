import { TestBed, inject } from '@angular/core/testing';

import { TeamNbaService } from './team-nba.service';

describe('TeamNbaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamNbaService]
    });
  });

  it('should be created', inject([TeamNbaService], (service: TeamNbaService) => {
    expect(service).toBeTruthy();
  }));
});
