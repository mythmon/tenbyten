import { combineReducers } from 'redux'

import plays from 'tenbyten/reducers/plays'
import items from 'tenbyten/reducers/items'
import geekLists from 'tenbyten/reducers/geekLists'
import requests from 'tenbyten/reducers/requests'

export default combineReducers({
  plays,
  items,
  geekLists,
  requests,
})
