import { UPDATE_ITEM } from 'tenbyten/actions/items'

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

    default: {
      return state
    }
  }
}
