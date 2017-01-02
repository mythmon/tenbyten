import React, { Component } from 'react'

import NavFields from 'tenbyten/components/NavFields'

export default class Home extends Component {
  render () {
    return (
      <div>
        <h1>
          10x10 challenge
        </h1>
        <p>
          Use the controls below to choose a Geeklist to get games from, and a user to get plays from.
        </p>
        <NavFields />
      </div>
    )
  }
}
