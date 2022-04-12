import { TestBed } from '@angular/core/testing';

import { ChannelResultRegistrationService } from './channel-result-registration.service';

describe('ChannelResultRegistrationService', () => {
  let service: ChannelResultRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelResultRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
