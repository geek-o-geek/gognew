import { TestBed, inject } from '@angular/core/testing';

import { FetchingpostService } from './fetchingpost.service';

describe('FetchingpostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchingpostService]
    });
  });

  it('should be created', inject([FetchingpostService], (service: FetchingpostService) => {
    expect(service).toBeTruthy();
  }));
});
