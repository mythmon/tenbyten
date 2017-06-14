import React, { Component } from 'react'

import { commitHash } from 'tenbyten/version'

export default class Footer extends Component {
  render () {
    return (
      <footer>
        <a href='https://github.com/mythmon/tenbyten'>Source on GitHub</a>
        {' — '}
        <span className='commit-info'>{commitHash.slice(0, 7)}</span>
      </footer>
    )
  }
}
