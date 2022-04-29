import { createAction, createReducer, on, props } from "@ngrx/store";
import { Token, User, Task } from "domain-core";

export interface Selector {
  state: EchoState
}

export interface EchoState {
  users: User[]
  tokens: Token[],
  tasks: Task[]
}

export const initialState: EchoState = {
  users: [],
  tokens: [],
  tasks: []
}

export const select = (state: Selector) => {
  return state
}

export const actionExchangeUsers = createAction(
  '[Users] Exchange Users',
  props<{users: User[]}>()
)

export const actionExchangeTokens = createAction(
  '[Tokens] Exchange Tokens',
  props<{tokens: Token[]}>()
)

export const actionExchangeTasks = createAction(
  '[Tasks] Exchange Tasks',
  props<{tasks: Task[]}>()
)

export const reducer = createReducer(
  initialState,
  on(actionExchangeTokens, (state, {tokens}) => {
    return {  users: [...state.users], tokens: [...tokens], tasks: [...state.tasks]  }
  }),
  on(actionExchangeUsers, (state, {users}) => {
    return { users: [...users], tokens: [...state.tokens], tasks: [...state.tasks] }
  }),
  on(actionExchangeTasks, (state, {tasks}) => {
    return { users: [...state.users], tokens: [...state.tokens], tasks: [...tasks] }
  })
)
