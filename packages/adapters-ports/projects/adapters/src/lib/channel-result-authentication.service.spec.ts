import { TestBed } from '@angular/core/testing';

import { ChannelResultAuthenticationService } from './channel-result-authentication.service';

describe('ChannelResultAuthenticationService', () => {
  let service: ChannelResultAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelResultAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
