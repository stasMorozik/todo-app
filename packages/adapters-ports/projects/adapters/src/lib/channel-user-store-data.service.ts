import { Inject, Injectable } from '@angular/core';
import { ChannelUserStoreData, User } from 'domain-core';
import { createAction, createReducer, on, props, Store } from '@ngrx/store';
import { EchoState, initialState } from './state';

export const actionExchangeUsers = createAction(
  '[Users] Exchange Users',
  props<{users: User[]}>()
)

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
