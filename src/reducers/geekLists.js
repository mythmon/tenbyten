import { ADD_GEEK_LIST } from 'tenbyten/actions/geekLists'

export default function geekListReducer (state = {}, action) {
  switch (action.type) {
    case ADD_GEEK_LIST: {
      return {
        ...state,
        [action.geekList.id]: action.geekList,
      }
    }

    default:
      return state
  }
}
