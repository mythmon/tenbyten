export function updatePlayer (player) {
  return {
    type: 'UPDATE_PLAYER',
    item: player,
  }
}

export function updatePlayerMany (players) {
  return {
    type: 'UPDATE_PLAYERS',
    items: players,
  }
}
