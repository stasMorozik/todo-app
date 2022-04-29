import { Injectable } from '@angular/core';
import { actionExchangeTokens, EchoState } from './state';
import { Store } from '@ngrx/store';
import { ChannelTokenStoreData, Token } from 'domain-core';

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
