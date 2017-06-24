import React from 'react'
import pt from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getCurrentPlayers } from 'tenbyten/state/players/selectors'
import PlayerLabel from 'tenbyten/components/PlayerLabel'

@connect(createStructuredSelector({
  players: getCurrentPlayers,
}))
export default class SessionsTable extends React.Component {
  static propTypes = {
    players: pt.arrayOf(pt.shape({
      id: pt.string.isRequired,
      username: pt.string,
      name: pt.string,
    })).isRequired,
  }

  render () {
    const { players } = this.props

    return (
      <div className='players-list'>
        {players.map(player => <PlayerLabel player={player} key={player.id} />)}
      </div>
    )
  }
}
