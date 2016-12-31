import { ADD_PLAY } from 'tenbyten/actions/plays'

export default function playReducer (state = {}, action) {
  switch (action.type) {
    case ADD_PLAY: {
      return {
        ...state,
        [action.play.id]: action.play,
      }
    }

    default:
      return state
  }
}
