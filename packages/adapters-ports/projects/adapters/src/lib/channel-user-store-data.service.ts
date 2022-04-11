import { Inject, Injectable } from '@angular/core';
import { ChannelUserStoreData, User } from 'domain-core';
import { createAction, createReducer, on, props, Store } from '@ngrx/store';
import { EchoState, initialState } from './state';

export const actionRegistration = createAction(
  '[Users] Registration',
  props<{users: User[]}>()
)

export const usersReducer = createReducer(
  initialState,
  on(actionRegistration, (state, {users}) => ( { users: [...users], tokens: [...state.tokens] } )),
)

@Injectable({
  providedIn: 'root'
})
export class ChannelUserStoreDataService implements ChannelUserStoreData {
  constructor(
    private readonly _store: Store<EchoState>
  ) {}
  
  emit(users: User[]): void {
    this._store.dispatch(actionRegistration({users}))
  }
}
