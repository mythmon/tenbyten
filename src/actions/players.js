export const UPDATE_PLAYER = 'UPDATE_PLAYER'
export const UPDATE_PLAYER_MANY = 'UPDATE_PLAYER_MANY'

export function updatePlayer (player) {
  return {
    type: UPDATE_PLAYER,
    player,
  }
}

export function updatePlayerMany (players) {
  return {
    type: UPDATE_PLAYER_MANY,
    players,
  }
}
