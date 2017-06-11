import createReducer from 'tenbyten/utils/createReducer'

export default function makeCollectionReducer (prefix) {
  const initialState = {}
  const handlers = {}

  handlers[prefix + '_UPDATE'] = (state, {item}) => ({
    ...state,
    [item.id]: {
      ...state[item.id],
      ...item,
    },
  })

  handlers[prefix + '_UPDATE_MANY'] = (state, {items}) => {
    const newState = {...state}
    for (let item of items) {
      newState[item.id] = { ...newState[item.id], ...item }
    }
    return newState
  }

  handlers[prefix + '_ADD'] = (state, {item}) => ({
    ...state,
    [item.id]: { ...item },
  })

  handlers[prefix + '_ADD_MANY'] = (state, {items}) => {
    const newState = { ...state }
    for (const item of items) {
      newState[item.id] = { ...item }
    }
    return newState
  }

  return createReducer(initialState, handlers)
}
