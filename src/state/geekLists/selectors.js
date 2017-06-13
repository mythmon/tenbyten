import { createSelector } from 'reselect'

import { Item } from 'tenbyten/state/items/selectors'
import Denormalizer from 'tenbyten/utils/Denormalizer'

export class GeekList extends Denormalizer {
  get collection () {
    return this.state.geekLists
  }

  get items () {
    return this.data.itemIds.map(itemId => {
      return new Item(this.state, itemId)
    })
  }
}

export function getCurrentGeekListId (state) {
  return state.router.params.listId
}

export function getAllGeekLists (state) {
  return Object.keys(state.geekLists)
    .map(key => new GeekList(state, key))
}

export const getCurrentGeekList = state => {
  const listId = state.router.params.listId
  if (listId in state.geekLists) {
    return new GeekList(state, listId)
  } else {
    return null
  }
}
