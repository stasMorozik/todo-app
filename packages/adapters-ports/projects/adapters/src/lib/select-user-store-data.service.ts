import { Injectable } from '@angular/core';
import { SelectUserStoreData, User } from 'domain-core';
import { createSelector, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { select, Selector } from './state';


export const users = createSelector(
  select,
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
