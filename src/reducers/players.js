import { UPDATE_PLAYER, UPDATE_PLAYER_MANY } from 'tenbyten/actions/players'

export default function playersReducer (state = {}, action) {
  switch (action.type) {
    case UPDATE_PLAYER: {
      return {
        ...state,
        [action.player.id]: {
          ...state[action.player.id],
          ...action.player,
        },
      }
    }

    case UPDATE_PLAYER_MANY: {
      let newState = {...state}
      for (let player of action.players) {
        newState[player.id] = {
          ...newState[player.id],
          ...player,
        }
      }
      return newState
    }

    default: {
      return state
    }
  }
}
