// @flow
import type { Action } from 'tenbyten/state/types'

export default function createReducer<S> (initialState: S, handlers: {[string]: (S, Action) => S}): (S, Action) => S {
  return (state: S = initialState, action: Action): S => {
    if (action.type in handlers) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
