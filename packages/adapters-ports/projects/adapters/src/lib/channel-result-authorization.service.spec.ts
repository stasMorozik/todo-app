import { TestBed } from '@angular/core/testing';

import { ChannelResultAuthorizationService } from './channel-result-authorization.service';

describe('ChannelResultAuthorizationService', () => {
  let service: ChannelResultAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelResultAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
