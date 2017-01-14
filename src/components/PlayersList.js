import React, { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getCurrentPlayers } from 'tenbyten/selectors/players'
import PlayerLabel from 'tenbyten/components/PlayerLabel'

class PlaysTable extends Component {
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

export default connect(createStructuredSelector({
  players: getCurrentPlayers,
}))(PlaysTable)
