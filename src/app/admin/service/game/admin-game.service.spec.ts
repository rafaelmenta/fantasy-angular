import { TestBed, inject } from '@angular/core/testing';

import { AdminGameService } from './admin-game.service';

describe('AdminGameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGameService]
    });
  });

  it('should be created', inject([AdminGameService], (service: AdminGameService) => {
    expect(service).toBeTruthy();
  }));
});
