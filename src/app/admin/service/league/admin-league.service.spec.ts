import { TestBed, inject } from '@angular/core/testing';

import { AdminLeagueService } from './admin-league.service';

describe('AdminLeagueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminLeagueService]
    });
  });

  it('should be created', inject([AdminLeagueService], (service: AdminLeagueService) => {
    expect(service).toBeTruthy();
  }));
});
