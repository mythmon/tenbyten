import React, { Component } from 'react'
import { RelativeFragment as Fragment } from 'redux-little-router'

import Header from 'tenbyten/components/Header'
import LoadingIndicator from 'tenbyten/components/LoadingIndicator'
import TenByTen from 'tenbyten/components/TenByTen'
import Home from 'tenbyten/components/Home'

export default class App extends Component {
  render () {
    return (
      <div className='root'>
        <LoadingIndicator />
        <div className='wrapper'>
          <Header />
          <div className='content'>
            <Fragment forRoute='/' withConditions={l => l.pathname === '/'}>
              <Home />
            </Fragment>
            <Fragment forRoute='/table/:listId/:username'>
              <TenByTen />
            </Fragment>
          </div>
          <footer>
            <a href='https://github.com/mythmon/tenbyten'>Source on GitHub</a>
          </footer>
        </div>
      </div>
    )
  }
}
