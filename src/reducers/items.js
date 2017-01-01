import { UPDATE_ITEM, UPDATE_ITEM_MANY } from 'tenbyten/actions/items'

export default function itemsReducer (state = {}, action) {
  switch (action.type) {
    case UPDATE_ITEM: {
      return {
        ...state,
        [action.item.id]: {
          ...state[action.item.id],
          ...action.item,
        },
      }
    }

    case UPDATE_ITEM_MANY: {
      let newState = {...state}
      for (let item of action.items) {
        newState[item.id] = {
          ...newState[item.id],
          ...item,
        }
      }
      return newState
    }

    default: {
      return state
    }
  }
}
