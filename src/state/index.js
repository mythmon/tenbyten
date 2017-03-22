import { combineReducers } from 'redux'

import geekLists from 'tenbyten/state/geekLists/reducer'
import geekListSearch from 'tenbyten/state/geekListSearch/reducer'
import items from 'tenbyten/state/items/reducer'
import players from 'tenbyten/state/players/reducer'
import plays from 'tenbyten/state/plays/reducer'
import requests from 'tenbyten/state/requests/reducer'

export const reducer = combineReducers({
  geekLists,
  geekListSearch,
  items,
  players,
  plays,
  requests,
})
