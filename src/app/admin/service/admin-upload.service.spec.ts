import { TestBed, inject } from '@angular/core/testing';

import { AdminUploadService } from './admin-upload.service';

describe('AdminUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminUploadService]
    });
  });

  it('should be created', inject([AdminUploadService], (service: AdminUploadService) => {
    expect(service).toBeTruthy();
  }));
});
