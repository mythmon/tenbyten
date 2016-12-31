import React, { Component, PropTypes as pt } from 'react'

import Header from 'tenbyten/components/Header.js'

export default class ControlApp extends Component {
  static propTypes = {
    children: pt.object.isRequired,
  }

  render () {
    const { children } = this.props
    return (
      <div>
        <Header />
        <div className='tenbyten-content'>
          { React.Children.map(children, child => React.cloneElement(child)) }
        </div>
      </div>
    )
  }
}