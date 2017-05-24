export function updatePlayer (player) {
  return {
    type: 'PLAYER_UPDATE',
    item: player,
  }
}

export function updatePlayerMany (players) {
  return {
    type: 'PLAYER_UPDATE_MANY',
    items: players,
  }
}
