import React from 'react'
import pt from 'prop-types'
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table.js'
import 'semantic-ui-css/components/table.css'

import SessionCell from 'tenbyten/components/SessionCell'

export default class SessionsRow extends React.Component {
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

    return (
      <Table.Row className='plays-row'>
        <Table.Cell className='plays-row-header'>
          <header>
            {item.name}
          </header>
          {item.averagePlayTime !== null &&
            <div name='average-play-time'>
              Ø
              {item.averagePlayTime}
            mins
            </div>
          }
        </Table.Cell>
        {sessionCells}
        <script type='application/json' dangerouslySetInnerHTML={{__html: JSON.stringify(this.props)}} />
      </Table.Row>
    )
  }
}
