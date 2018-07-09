import { TestBed, inject } from '@angular/core/testing';

import { AdminTeamService } from './admin-team.service';

describe('AdminTeamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminTeamService]
    });
  });

  it('should be created', inject([AdminTeamService], (service: AdminTeamService) => {
    expect(service).toBeTruthy();
  }));
});
