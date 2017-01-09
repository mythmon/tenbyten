import React, { Component } from 'react'

import Header from 'tenbyten/components/Header'
import LoadingIndicator from 'tenbyten/components/LoadingIndicator'
import {RouteFragments} from 'tenbyten/routes'

export default class App extends Component {
  render () {
    return (
      <div className='root'>
        <LoadingIndicator />
        <div className='wrapper'>
          <Header />
          <div className='content'>
            {RouteFragments}
          </div>
          <footer>
            <a href='https://github.com/mythmon/tenbyten'>Source on GitHub</a>
          </footer>
        </div>
      </div>
    )
  }
}
