import createReducer from 'tenbyten/utils/createReducer'

export default function makeCollectionReducer ({updateOne, updateMany, addOne, addMany}) {
  const initialState = {}
  const handlers = {}

  if (updateOne) {
    handlers[updateOne] = (state, {item}) => ({
      ...state,
      [item.id]: {
        ...state[item.id],
        ...item,
      },
    })
  }

  if (updateMany) {
    handlers[updateMany] = (state, {items}) => {
      const newState = {...state}
      for (let item of items) {
        newState[item.id] = { ...newState[item.id], ...item }
      }
      return newState
    }
  }

  if (addOne) {
    handlers[addOne] = (state, {item}) => ({
      ...state,
      [item.id]: { ...item },
    })
  }

  if (addMany) {
    handlers[addMany] = (state, {items}) => {
      const newState = { ...state }
      for (const item of items) {
        newState[item.id] = { ...item }
      }
      return newState
    }
  }

  return createReducer(initialState, handlers)
}
