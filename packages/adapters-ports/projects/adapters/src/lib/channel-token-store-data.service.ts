import { Injectable } from '@angular/core';
import { EchoState, initialState } from './state';
import { createAction, createReducer, on, props, Store } from '@ngrx/store';
import { ChannelTokenStoreData, Token } from 'domain-core';

export const actionExchangeTokens = createAction(
  '[Tokens] Exchange Tokens',
  props<{tokens: Token[]}>()
)

@Injectable({
  providedIn: 'root'
})
export class ChannelTokenStoreDataService implements ChannelTokenStoreData {
  constructor(
    private readonly _store: Store<EchoState>
  ) {}

  emit(tokens: Token[]): void {
    this._store.dispatch(actionExchangeTokens({tokens}))
  }
}
