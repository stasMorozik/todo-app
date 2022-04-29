import { TestBed } from '@angular/core/testing';

import { ChannelTaskStoreDataService } from './channel-task-store-data.service';

describe('ChannelTaskStoreDataService', () => {
  let service: ChannelTaskStoreDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelTaskStoreDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
