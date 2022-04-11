import { TestBed } from '@angular/core/testing';

import { ChannelSuccessAuthorizationService } from './channel-success-authorization.service';

describe('ChannelSuccessAuthorizationService', () => {
  let service: ChannelSuccessAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelSuccessAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
