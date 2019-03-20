import { TestBed, inject } from '@angular/core/testing';

import { CreatepostService } from './createpost.service';

describe('CreatepostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatepostService]
    });
  });

  it('should be created', inject([CreatepostService], (service: CreatepostService) => {
    expect(service).toBeTruthy();
  }));
});
