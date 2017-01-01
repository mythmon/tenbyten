export const getPlays = state => (
  Object.values(state.plays)
  .map(play => ({
    ...play,
    item: state.items[play.item],
  }))
)
