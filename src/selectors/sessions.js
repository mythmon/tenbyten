import { createSelector } from 'reselect'

import { getCurrentPlays } from 'tenbyten/selectors/plays'

export const getCurrentSessions = createSelector(
  [getCurrentPlays],
  currentPlays => {
    const playsByDay = {}
    for (const play of currentPlays) {
      const key = `${play.date.format('YYYY-MM-DD')};${play.item.id}`
      if (!(key in playsByDay)) {
        playsByDay[key] = []
      }
      playsByDay[key].push(play)
    }
    return Object.values(playsByDay).map(playSet => ({
      plays: playSet,
      date: playSet[0].date,
      item: playSet[0].item,
    }))
  }
)

export const getCurrentSessionsByItem = createSelector(
  [getCurrentSessions],
  currentSessions => {
    const sessionsByItem = {}
    for (const session of currentSessions) {
      const key = session.item.id
      if (!(key in sessionsByItem)) {
        sessionsByItem[key] = []
      }
      sessionsByItem[key].push(session)
    }
    return sessionsByItem
  }
)
