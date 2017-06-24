import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import {
  routerForBrowser,
  initializeCurrentLocation,
} from 'redux-little-router'

import * as tenbytenReducers from 'tenbyten/state'
import routes from 'tenbyten/routes'

const onGithub = window.location.hostname.indexOf('github.io') !== -1
const routerParts = routerForBrowser({
  routes,
  basename: onGithub ? '/tenbyten' : undefined,
})

const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: true,
})

const enhancer = compose(
  routerParts.enhancer,
  applyMiddleware(
    routerParts.middleware,
    thunk,
    logger,
  ),
)

export function configureStore () {
  const builtReducer = combineReducers({
    ...tenbytenReducers,
    router: routerParts.reducer,
  })
  const initialState = builtReducer(undefined, {type: 'INITIAL'})
  const store = createStore(builtReducer, initialState, enhancer)

  const initialLocation = store.getState().router
  store.dispatch(initializeCurrentLocation({
    pathname: 'fakepathname',
  }))
  store.dispatch(initializeCurrentLocation(initialLocation))

  return store
}
