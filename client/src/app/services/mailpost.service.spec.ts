import { TestBed, inject } from '@angular/core/testing';

import { MailpostService } from './mailpost.service';

describe('MailpostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailpostService]
    });
  });

  it('should be created', inject([MailpostService], (service: MailpostService) => {
    expect(service).toBeTruthy();
  }));
});
