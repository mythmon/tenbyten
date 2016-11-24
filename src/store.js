import { compose, createStore, applyMiddleware } from 'redux'
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import reducers from 'thedoc/reducers'

const reduxRouterMiddleware = routerMiddleware(hashHistory)

// middleware
const enhancer = compose(
  applyMiddleware(
    reduxRouterMiddleware,
    thunk,
    createLogger({
      actionTransformer: (action) => ({
        ...action,
        type: String(action.type).replace(/^Symbol\(/, '').replace(/\)$/, ''),
      }),
      colors: {
        title: false,
        prevState: false,
        action: false,
        nextState: false,
        error: false,
      },
    }),
  ),
)

export function configureStore (initialState) {
  return createStore(reducers, initialState, enhancer)
}
