import { TestBed } from '@angular/core/testing';

import { HaveAuthorizationGuard } from './have-authorization.guard';

describe('HaveAuthorizationGuard', () => {
  let guard: HaveAuthorizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HaveAuthorizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
