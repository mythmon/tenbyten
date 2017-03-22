import { createSelector } from 'reselect'

import { getCurrentGeekList } from 'tenbyten/state/geekLists/selectors'

export const getCurrentUser = state => state.router.params.username

export const getAllPlays = state => (
  Object.values(state.plays)
  .map(play => ({
    ...play,
    item: state.items[play.item],
    players: play.players.map(player => ({ ...state.players[player.id], ...player })),
  }))
)

export const getCurrentPlays = createSelector(
  [getCurrentUser, getAllPlays, getCurrentGeekList],
  (currentUser, allPlays, currentGeekList) => {
    let plays = allPlays.filter(play => play.creator === currentUser)

    if (currentGeekList) {
      const listItemIds = new Set(currentGeekList.items.map(item => item.id))
      plays = plays.filter(play => listItemIds.has(play.item.id))
    }

    return plays
  }
)

export const getPlaysByItem = createSelector(
  [getCurrentPlays],
  plays => {
    const playsByItem = {}
    for (const play of plays) {
      const key = play.item.id
      if (!(key in playsByItem)) {
        playsByItem[key] = []
      }
      playsByItem[key].push(play)
    }
    return playsByItem
  }
)
