import React, { Component } from 'react'
import { autobind } from 'core-decorators'

import { commitHash } from 'tenbyten/version'
import Identicon from 'tenbyten/components/Identicon'

export default class Footer extends Component {
  constructor (props) {
    super(props)

    this.hoverTimers = []

    this.state = {
      expandCommit: 0,
    }
  }

  clearTimers () {
    for (const timer of this.hoverTimers) {
      clearTimeout(timer)
    }
    this.hoverTimers = []
  }

  @autobind
  handleCommitMouseEnter () {
    this.clearTimers()
    this.hoverTimers.push(setTimeout(() => {
      this.setState({ expandCommit: 1 })
    }, 500))

    this.hoverTimers.push(setTimeout(() => {
      this.setState({ expandCommit: 2 })
    }, 4000))
  }

  @autobind
  handleCommitMouseLeave () {
    this.clearTimers()
    this.setState({ expandCommit: 1 })
    this.hoverTimers.push(setTimeout(() => {
      this.setState({ expandCommit: 0 })
    }, 400))
  }

  render () {
    const { expandCommit } = this.state

    return (
      <footer>
        <a href='https://github.com/mythmon/tenbyten'>Source on GitHub</a>
        {' — '}
        <span
          onMouseEnter={this.handleCommitMouseEnter}
          onMouseLeave={this.handleCommitMouseLeave}
          className='commit-info'
        >
          <Identicon data={commitHash} />
          <span className='commit-hash-left' data-expand={expandCommit}>{commitHash.slice(0, 7)}</span>
          <span className='commit-hash-right' data-expand={expandCommit}>{commitHash.slice(7)}</span>
        </span>
      </footer>
    )
  }
}
