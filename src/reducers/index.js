import { combineReducers } from 'redux'

import geekLists from 'tenbyten/reducers/geekLists'
import items from 'tenbyten/reducers/items'
import players from 'tenbyten/reducers/players'
import plays from 'tenbyten/reducers/plays'
import requests from 'tenbyten/reducers/requests'

export default combineReducers({
  geekLists,
  items,
  players,
  plays,
  requests,
})
