import { createSelector } from 'reselect'

export const getCurrentUser = (state, props) => props.params.username

export const getAllPlays = state => (
  Object.values(state.plays)
  .map(play => ({
    ...play,
    item: state.items[play.item],
  }))
)

export const getPlays = createSelector(
  [getCurrentUser, getAllPlays],
  (currentUser, allPlays) => allPlays.filter(play => play.creator === currentUser)
)

export const getPlaysByItem = createSelector(
  [getPlays],
  plays => {
    const playsByItem = {}
    for (const play of plays) {
      const key = play.item.id
      if (!(key in playsByItem)) {
        playsByItem[key] = []
      }
      playsByItem[key] = playsByItem[key].concat(play)
    }
    return playsByItem
  }
)
