import React, { Component, PropTypes as pt } from 'react'

import Header from 'tenbyten/components/Header'
import LoadingIndicator from 'tenbyten/components/LoadingIndicator'

export default class ControlApp extends Component {
  static propTypes = {
    children: pt.object.isRequired,
  }

  render () {
    const { children } = this.props
    return (
      <div className='root'>
        <LoadingIndicator />
        <div className='wrapper'>
          <Header />
          <div className='content'>
            { React.Children.map(children, child => React.cloneElement(child)) }
          </div>
          <footer>
            <a href='https://github.com/mythmon/tenbyten'>Source on GitHub</a>
          </footer>
        </div>
      </div>
    )
  }
}
