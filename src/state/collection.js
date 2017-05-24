// @flow
import createReducer from 'tenbyten/utils/createReducer'

import type { Action } from 'tenbyten/state/types'

export type CollectionState<T> = {
  [number]: T,
}

type CollectionReducer<T> = {
  [string]: {[Action]: (CollectionState<T>, any) => CollectionState<T>}
}

export default function makeCollectionReducer<T: {id: number}> (prefix: string): CollectionReducer<T> {
  const initialState: CollectionState<T> = {}
  const handlers = {}

  handlers[prefix + '_UPDATE'] = (state: CollectionState<T>, {item}: {item: T}): CollectionState<T> => ({
    ...state,
    [item.id]: {
      ...state[item.id],
      ...item,
    },
  })

  handlers[prefix + '_UPDATE_MANY'] = (state: CollectionState<T>, {items}: {items: Array<T>}): CollectionState<T> => {
    const newState = {...state}
    for (let item of items) {
      newState[item.id] = { ...newState[item.id], ...item }
    }
    return newState
  }

  handlers[prefix + '_ADD'] = (state: CollectionState<T>, {item}: {item: T}): CollectionState<T> => ({
    ...state,
    [item.id]: { ...item },
  })

  handlers[prefix + '_ADD_MANY'] = (state: CollectionState<T>, {items}: {items: Array<T>}): CollectionState<T> => {
    const newState = { ...state }
    for (const item of items) {
      newState[item.id] = { ...item }
    }
    return newState
  }

  return createReducer(initialState, handlers)
}
