import { TestBed } from '@angular/core/testing';

import { ChannelResultChangeTasksService } from './channel-result-change-tasks.service';

describe('ChannelResultChangeTasksService', () => {
  let service: ChannelResultChangeTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelResultChangeTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
