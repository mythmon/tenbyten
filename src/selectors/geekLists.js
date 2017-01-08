import { createSelector } from 'reselect'

import { getItems } from 'tenbyten/selectors/items'

export const getCurrentGeekListId = state => state.router.params.listId

export const getAllGeekLists = state => state.geekLists

export const getGeekList = createSelector(
  [getCurrentGeekListId, getAllGeekLists, getItems],
  (geekListId, allGeekLists, items) => {
    if (!(geekListId in allGeekLists)) {
      return null
    }
    const geekList = allGeekLists[geekListId]
    return {
      ...geekList,
      items: geekList.items.map(itemId => items[itemId]),
    }
  }
)
