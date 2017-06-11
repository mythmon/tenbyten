import { createSelector } from 'reselect'

import { getAllItems } from 'tenbyten/state/items/selectors'

export function getCurrentGeekListId (state) {
  return state.router.params.listId
}

export function getAllGeekLists (state) {
  return state.geekLists
}

export const getCurrentGeekList = createSelector(
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
