import { TestBed, inject } from '@angular/core/testing';

import { ClubhouseService } from './clubhouse.service';

describe('ClubhouseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClubhouseService]
    });
  });

  it('should be created', inject([ClubhouseService], (service: ClubhouseService) => {
    expect(service).toBeTruthy();
  }));
});
