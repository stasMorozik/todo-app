import { TestBed } from '@angular/core/testing';

import { HaveNotAuthorizationGuard } from './have-not-authorization.guard';

describe('HaveNotAuthorizationGuard', () => {
  let guard: HaveNotAuthorizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HaveNotAuthorizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
