import { Injectable } from '@angular/core';
import { EchoState, initialState } from './state';
import { createAction, createReducer, on, props, Store } from '@ngrx/store';
import { ChannelTokenStoreData, Token } from 'domain-core';

export const actionDeauthorization = createAction(
  '[Tokens] Deauthorization',
  props<{tokens: Token[]}>()
)

export const tokensReducer = createReducer(
  initialState,
  on(actionDeauthorization, (state, {tokens}) => (  {  users: [...state.users], tokens: [...tokens]  } )),
)

@Injectable({
  providedIn: 'root'
})
export class ChannelTokenStoreDataService implements ChannelTokenStoreData {
  constructor(
    private readonly _store: Store<EchoState>
  ) {}

  emit(tokens: Token[]): void {
    this._store.dispatch(actionDeauthorization({tokens}))
  }
}
