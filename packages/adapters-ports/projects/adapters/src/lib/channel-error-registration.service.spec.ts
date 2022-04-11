import { TestBed } from '@angular/core/testing';

import { ChannelErrorRegistrationService } from './channel-error-registration.service';

describe('ChannelErrorService', () => {
  let service: ChannelErrorRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelErrorRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
