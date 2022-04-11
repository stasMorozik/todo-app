import { TestBed } from '@angular/core/testing';

import { ChannelErrorAuthenticationService } from './channel-error-authentication.service';

describe('ChannelErrorAuthenticationService', () => {
  let service: ChannelErrorAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelErrorAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
