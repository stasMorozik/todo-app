import { TestBed } from '@angular/core/testing';

import { ChannelResultValidationService } from './channel-result-validation.service';

describe('ChannelResultValidationService', () => {
  let service: ChannelResultValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelResultValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
