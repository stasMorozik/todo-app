import { TestBed } from '@angular/core/testing';

import { ChannelSuccessRegistrationService } from './channel-success-registration.service';

describe('ChannelSuccessRegistrationService', () => {
  let service: ChannelSuccessRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelSuccessRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
