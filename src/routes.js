import React from 'react'
import { RelativeFragment as Fragment, Link } from 'redux-little-router'

import TenByTen from 'tenbyten/components/TenByTen'
import Home from 'tenbyten/components/Home'

export default {
  '/': {},
  '/table/:listId/:username/': {},
}

export const RouteFragments = (
  <div>
    <Fragment forRoute='/' withConditions={l => l.pathname === '/'}>
      <Home />
    </Fragment>
    <Fragment forRoute='/table/:listId/:username/'>
      <TenByTen />
    </Fragment>
  </div>
)
