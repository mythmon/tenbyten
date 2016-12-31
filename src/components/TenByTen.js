import React, { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'

import QueryPlays from 'tenbyten/components/data/QueryPlays'

class TenByTen extends Component {
  static propTypes = {
    plays: pt.arrayOf(pt.shape({
      id: pt.number.isRequired,
      date: pt.instanceOf(Date).isRequired,
      item: pt.shape({
        id: pt.number.isRequired,
        name: pt.string.isRequired,
      }).isRequired,
    })).isRequired,
  }

  render () {
    const {plays} = this.props

    return (
      <div>
        <QueryPlays username='gca3020' />
        <ul>
          {plays.map(play => (
            <li key={play.id}>{play.date.toLocaleString()} - {play.item.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default connect(state => ({
  plays: Object.values(state.plays).map(play => {
    return {
      ...play,
      item: state.items[play.item],
    }
  }),
}))(TenByTen)
