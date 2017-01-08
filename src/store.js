import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { routerForBrowser, initializeCurrentLocation } from 'redux-little-router'

import reducers from 'tenbyten/reducers'
import routes from 'tenbyten/routes'

// middleware
const onGithub = window.location.hostname.indexOf('github.io') !== -1
console.log('onGithub', onGithub)
const { routerEnhancer, routerMiddleware } = routerForBrowser({
  routes,
  basename: onGithub ? '/tenbyten' : '/',
})

const logger = createLogger({
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
})

const enhancer = compose(
  routerEnhancer,
  applyMiddleware(
    routerMiddleware,
    thunk,
    logger,
  ),
)

export function configureStore (initialState) {
  const store = createStore(reducers, initialState, enhancer)
  const initialLocation = store.getState().router
  store.dispatch(initializeCurrentLocation(initialLocation))
  return store
}
