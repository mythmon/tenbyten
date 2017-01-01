import { ADD_PLAY, ADD_PLAY_MANY } from 'tenbyten/actions/plays'

export default function playReducer (state = {}, action) {
  switch (action.type) {
    case ADD_PLAY: {
      return {
        ...state,
        [action.play.id]: action.play,
      }
    }

    case ADD_PLAY_MANY: {
      let newState = {...state}
      for (let play of action.plays) {
        newState[play.id] = play
      }
      return newState
    }

    default:
      return state
  }
}
