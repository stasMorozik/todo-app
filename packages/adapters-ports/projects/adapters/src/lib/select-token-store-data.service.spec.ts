import { TestBed } from '@angular/core/testing';

import { SelectTokenStoreDataService } from './select-token-store-data.service';

describe('SelectTokenStoreDataService', () => {
  let service: SelectTokenStoreDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectTokenStoreDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
