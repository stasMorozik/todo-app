import { TestBed } from '@angular/core/testing';

import { SelectUserStoreDataService } from './select-user-store-data.service';

describe('SelectStoreDataService', () => {
  let service: SelectUserStoreDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectUserStoreDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
