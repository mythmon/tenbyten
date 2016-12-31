import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from 'tenbyten/components/App'
import TenByTen from 'tenbyten/components/TenByTen'
import NoMatch from 'tenbyten/components/NoMatch'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={TenByTen} />
    <Route path='*' component={NoMatch} />
  </Route>
)
