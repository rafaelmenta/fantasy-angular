import { TestBed, inject } from '@angular/core/testing';

import { PickService } from './pick.service';

describe('PickService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PickService]
    });
  });

  it('should be created', inject([PickService], (service: PickService) => {
    expect(service).toBeTruthy();
  }));
});
