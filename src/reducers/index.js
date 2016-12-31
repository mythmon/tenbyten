import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import plays from 'tenbyten/reducers/plays'
import items from 'tenbyten/reducers/items'
import requests from 'tenbyten/reducers/requests'

export default combineReducers({
  plays,
  items,
  routing,
  requests,
})
