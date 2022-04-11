import { Token, User } from "domain-core";

export interface Selector {
  state: {
    users: User[]
    tokens: Token[]
  }
}

export interface EchoState {
  users: User[]
  tokens: Token[]
}

export const initialState: EchoState = {
  users: [],
  tokens: []
}