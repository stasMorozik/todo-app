import { Injectable } from '@angular/core';
import { SelectUserStoreData, User } from 'domain-core';
import { createSelector, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { Selector } from './state';


export const selectUser = (state: Selector) => {
  return state
}

export const users = createSelector(
  selectUser,
  (state) => state.state.users
)

@Injectable({
  providedIn: 'root'
})
export class SelectUserStoreDataService implements SelectUserStoreData {
  constructor(
    private readonly _store: Store<Selector>
  ) {}

  select(): Promise<User[]> {
    return this._store.select(users).pipe(first()).toPromise() as Promise<User[]>
  }
}
