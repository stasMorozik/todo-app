import { TestBed } from '@angular/core/testing';

import { ChannelTokenStoreDataService } from './channel-token-store-data.service';

describe('ChannelTokenStoreDataService', () => {
  let service: ChannelTokenStoreDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelTokenStoreDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
