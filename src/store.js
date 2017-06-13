import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import {
  routerForBrowser,
  initializeCurrentLocation,
  LOCATION_CHANGED,
  createMatcher,
} from 'redux-little-router'

import { reducer } from 'tenbyten/state'
import routes from 'tenbyten/routes'

// middleware
const onGithub = window.location.hostname.indexOf('github.io') !== -1
console.log('onGithub', onGithub)
const { routerEnhancer, routerMiddleware } = routerForBrowser({
  routes,
  basename: onGithub ? '/tenbyten' : undefined,
})

const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: true,
})

const fixRouterActionsMiddleware = store => next => action => {
  if (action.type !== LOCATION_CHANGED) {
    return next(action)
  }

  const newAction = { ...action }
  const payload = newAction.payload
  if (payload.pathname.startsWith(payload.basename)) {
    const length = payload.basename.length
    payload.pathname = payload.pathname.slice(length)
    const match = createMatcher(routes)(payload.pathname)
    if (match) {
      newAction.payload = { ...payload, ...match }
    }
  }

  return next(newAction)
}

const enhancer: Function = compose(
  routerEnhancer,
  applyMiddleware(
    fixRouterActionsMiddleware,
    routerMiddleware,
    thunk,
    logger,
  ),
)

export function configureStore () {
  const store = createStore(reducer, null, enhancer)
  const initialLocation = store.getState().router
  store.dispatch(initializeCurrentLocation({
    pathname: 'fakepathname',
  }))
  store.dispatch(initializeCurrentLocation(initialLocation))
  return store
}
