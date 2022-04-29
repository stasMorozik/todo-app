import { TestBed } from '@angular/core/testing';

import { ChannelUserTaskService } from './channel-user-task.service';

describe('ChannelUserTaskService', () => {
  let service: ChannelUserTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelUserTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
