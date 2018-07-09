import { TestBed, inject } from '@angular/core/testing';

import { AdminDraftService } from './admin-draft.service';

describe('AdminDraftService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminDraftService]
    });
  });

  it('should be created', inject([AdminDraftService], (service: AdminDraftService) => {
    expect(service).toBeTruthy();
  }));
});
