import { createSelector } from 'reselect'

import { getAllItems } from 'tenbyten/selectors/items'

export const getCurrentGeekListId = state => state.router.params.listId

export const getAllGeekLists = state => state.geekLists

export const getCurrentGeekList = createSelector(
  [getCurrentGeekListId, getAllGeekLists, getAllItems],
  (geekListId, allGeekLists, allItems) => {
    if (!(geekListId in allGeekLists)) {
      return null
    }
    const geekList = allGeekLists[geekListId]
    return {
      ...geekList,
      items: geekList.items.map(itemId => allItems[itemId]),
    }
  }
)
