import { TestBed } from '@angular/core/testing';

import { ChannelUserStoreDataService } from './channel-user-store-data.service';

describe('ChannelStoreDataService', () => {
  let service: ChannelUserStoreDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelUserStoreDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
