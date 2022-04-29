import { Injectable } from '@angular/core';
import { ChannelUserStoreData, User } from 'domain-core';
import { Store } from '@ngrx/store';
import { actionExchangeUsers, EchoState } from './state';


@Injectable({
  providedIn: 'root'
})
export class ChannelUserStoreDataService implements ChannelUserStoreData {
  constructor(
    private readonly _store: Store<EchoState>
  ) {}
  
  emit(users: User[]): void {
    this._store.dispatch(actionExchangeUsers({users}))
  }
}
