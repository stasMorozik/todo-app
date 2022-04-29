import { createReducer, on } from "@ngrx/store";
import { Token, User } from "domain-core";
import { actionExchangeTokens } from "./channel-token-store-data.service";
import { actionExchangeUsers } from "./channel-user-store-data.service";

export interface Selector {
  state: EchoState
}

export interface EchoState {
  users: User[]
  tokens: Token[]
}

export const initialState: EchoState = {
  users: [],
  tokens: []
}

export const select = (state: Selector) => {
  return state
}

export const reducer = createReducer(
  initialState,
  on(actionExchangeTokens, (state, {tokens}) => {
    return {  users: [...state.users], tokens: [...tokens]  }
  }),
  on(actionExchangeUsers, (state, {users}) => {
    return { users: [...users], tokens: [...state.tokens] }
  }),
)
