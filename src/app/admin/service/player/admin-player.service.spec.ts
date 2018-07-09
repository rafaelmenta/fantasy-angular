import { TestBed, inject } from '@angular/core/testing';

import { AdminPlayerService } from './admin-player.service';

describe('AdminPlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminPlayerService]
    });
  });

  it('should be created', inject([AdminPlayerService], (service: AdminPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
