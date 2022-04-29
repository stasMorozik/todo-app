import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { createSelector, Store } from '@ngrx/store';
import { select, Selector } from './state';
import { SelectTokenStoreData, Token } from 'domain-core';

export const tokens = createSelector(
  select,
  (state) => state.state.tokens
)

@Injectable({
  providedIn: 'root'
})
export class SelectTokenStoreDataService implements SelectTokenStoreData {
  constructor(
    private readonly _store: Store<Selector>
  ) {}

  select(): Promise<Token[]> {
    return this._store.select(tokens).pipe(first()).toPromise() as Promise<Token[]>
  }
}
