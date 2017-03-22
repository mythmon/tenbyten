import React, { Component, PropTypes as pt } from 'react'
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table.js'
import 'semantic-ui-css/components/table.css'

import SessionCell from 'tenbyten/components/SessionCell'

export default class SessionsRow extends Component {
  static propTypes = {
    item: pt.shape({
      id: pt.number.isRequired,
      name: pt.string.isRequired,
    }),
    sessions: pt.array.isRequired,
    maxSessions: pt.number,
  }

  static defaultProps = {
    maxSessions: 10,
  }

  render () {
    const {item, sessions, maxSessions} = this.props

    const sessionCells = []
    for (let session of sessions.slice(0, maxSessions)) {
      sessionCells.push(
        <SessionCell key={`${session.date}-${session.item.id}`} session={session} />
      )
    }

    while (sessionCells.length < maxSessions) {
      sessionCells.push(
        <Table.Cell key={`empty-play-${sessionCells.length}`} />
      )
    }

    let averagePlayTime = null
    const plays = sessions.map(session => session.plays).reduce((a, b) => a.concat(b), [])
    const playTimes = plays.map(play => play.length).filter(a => a > 0)
    if (playTimes.length > 0) {
      averagePlayTime = Math.round(playTimes.reduce((a, b) => a + b, 0) / playTimes.length)
    }

    return (
      <Table.Row className='plays-row'>
        <Table.Cell className='plays-row-header'>
          <header>
            {item.name}
          </header>
          {averagePlayTime !== null &&
            <div name='average-play-time'>
              Ø {averagePlayTime}            mins
            </div>
          }
        </Table.Cell>
        {sessionCells}
        <script type='application/json' dangerouslySetInnerHTML={{__html: JSON.stringify(this.props)}} />
      </Table.Row>
    )
  }
}
