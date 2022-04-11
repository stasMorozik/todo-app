import { TestBed } from '@angular/core/testing';

import { ChannelErrorAuthorizationService } from './channel-error-authorization.service';

describe('ChannelErrorAuthorizationService', () => {
  let service: ChannelErrorAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelErrorAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
