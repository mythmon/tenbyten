import { createSelector } from 'reselect'

export const getAllPlayers = state => state.players

import { getCurrentPlays } from 'tenbyten/state/plays/selectors'

export const getCurrentPlayers = createSelector(
  [getCurrentPlays, getAllPlayers],
  (plays, allPlayers) => {
    const playerIds = new Set()
    for (const play of plays) {
      for (const player of play.players) {
        playerIds.add(player.id)
      }
    }
    return Array.from(playerIds).map(playerId => allPlayers[playerId])
  }
)
