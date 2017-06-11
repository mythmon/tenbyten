import Denormalizer from 'tenbyten/utils/Denormalizer'
import lazyGetter from 'tenbyten/utils/lazyGetter'
import { getPlaysByItem } from 'tenbyten/state/plays/selectors'

class Item extends Denormalizer {
  get collection () {
    return this.state.items
  }

  get name () {
    return this.data.name
  }

  @lazyGetter
  get averagePlayTime () {
    const playsByItem = getPlaysByItem(this.state)
    const plays = playsByItem[this.id] || []

    let averagePlayTime = null
    const playTimes = plays.map(play => play.length).filter(a => a > 0)
    if (playTimes.length > 0) {
      averagePlayTime = Math.round(playTimes.reduce((a, b) => a + b, 0) / playTimes.length)
    }
    return averagePlayTime
  }
}

export const getAllItems = state => {
  const items = {}
  for (let key in state.items) {
    key = parseInt(key)
    items[key] = new Item(state, key)
  }
  return items
}
