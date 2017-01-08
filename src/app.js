import React, { PropTypes as pt } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'redux-little-router'

import { configureStore } from 'tenbyten/store'
import App from 'tenbyten/components/App'

/**
 * Root Component for the entire app.
 */
export function Root ({ store }) {
  return (
    <Provider store={store}>
      <RouterProvider store={store}>
        <App />
      </RouterProvider>
    </Provider>
  )
}
Root.propTypes = {
  store: pt.object.isRequired,
  history: pt.object.isRequired,
}

/**
 * Initialize Redux store, history, and root component.
 */
export function createApp () {
  const store = configureStore()

  return {
    store,
    rootComponent: (<Root store={store} history={history} />),
  }
}
