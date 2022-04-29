import { TestBed } from '@angular/core/testing';

import { SelectTaskStoreDataService } from './select-task-store-data.service';

describe('SelectTaskStoreDataService', () => {
  let service: SelectTaskStoreDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectTaskStoreDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
