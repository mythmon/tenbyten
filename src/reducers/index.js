import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import words from 'thedoc/reducers/words'
import requests from 'thedoc/reducers/requests'

export default combineReducers({
  words,
  routing,
  requests,
})
