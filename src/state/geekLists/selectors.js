// @flow
import { createSelector } from 'reselect'

import { getAllItems } from 'tenbyten/state/items/selectors'

import type { State } from 'tenbyten/state/types'
import type { GeekList, NormalizedGeekList } from 'tenbyten/state/geekLists/types'

export function getCurrentGeekListId (state: State): number {
  return state.router.params.listId
}

export function getAllGeekLists (state: State): {[number]: NormalizedGeekList} {
  return state.geekLists
}

export const getCurrentGeekList: (State) => ?GeekList = createSelector(
  getCurrentGeekListId, getAllGeekLists, getAllItems,
  function (geekListId, allGeekLists, allItems) {
    if (!(geekListId in allGeekLists)) {
      return null
    }
    const geekList = allGeekLists[geekListId]
    return {
      id: geekList.id,
      items: geekList.items.map(itemId => allItems[itemId]),
    }
  }
)
