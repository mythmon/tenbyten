import { createSelector } from 'reselect'
import yaml from 'js-yaml'

import Denormalizer from 'tenbyten/utils/Denormalizer'
import lazyGetter from 'tenbyten/utils/lazyGetter'
import { getCurrentGeekList } from 'tenbyten/state/geekLists/selectors'
import { Item } from 'tenbyten/state/items/selectors'

class Play extends Denormalizer {
  get collection () {
    return this.state.plays
  }

  get date () {
    return this.data.date
  }

  get creator () {
    return this.data.creator
  }

  get item () {
    return new Item(this.state, this.data.itemId)
  }

  get comments () {
    return this.data.comments
  }

  @lazyGetter
  get commentsParsed () {
    if (this.comments && this.comments !== '') {
      try {
        let parsed = yaml.safeLoad(this.comments)
        if (typeof parsed === 'object') {
          return parsed
        }
      } catch (e) {
        // pass
      }
    }
    return null
  }

  get length () {
    return this.data.length
  }

  @lazyGetter
  get players () {
    // merge local player data with global player data
    return this.data.players.map(player => ({ ...this.state.players[player.id], ...player }))
  }
}

export const getCurrentUser = state => state.router.params.username

export const getAllPlays = state => {
  const plays = Object.keys(state.plays)
        .map(key => new Play(state, key))

  plays.sort((a, b) => {
    if (+a.date > +b.date) {
      return 1
    } else if (+a.date < +b.date) {
      return -1
    } else {
      return 0
    }
  })
  return plays
}

export const getCurrentPlays = createSelector(
  getCurrentUser, getAllPlays, getCurrentGeekList,
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
  getCurrentPlays,
  (plays) => {
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
