import React from 'react'
import { Fragment } from 'redux-little-router'

import TenByTen from 'tenbyten/components/TenByTen'
import Home from 'tenbyten/components/Home'

export default {
  '/': {},
  '/table/:listId/:username/': {},
  '/:listId/:username/table': {},
}

export const RouteFragments = (
  <div>
    <Fragment forRoute='/' withConditions={l => l.pathname === '/'}>
      <Home />
    </Fragment>
    <Fragment forRoute='/table/:listId/:username/'>
      <TenByTen />
    </Fragment>
    <Fragment forRoute='/:listId/:username/table'>
      <TenByTen />
    </Fragment>
  </div>
)
