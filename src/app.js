import React from 'react'
import pt from 'prop-types'
import { Provider } from 'react-redux'
import { RouterProvider } from 'redux-little-router'

import { configureStore } from 'tenbyten/store'
import App from 'tenbyten/components/App'

/**
 * Root Component for the entire app.
 */
class Root extends React.Component {
  static propTypes = {
    store: pt.object.isRequired,
  }

  render () {
    const { store } = this.props
    return (
      <Provider store={store}>
        <RouterProvider store={store}>
          <App />
        </RouterProvider>
      </Provider>
    )
  }
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
