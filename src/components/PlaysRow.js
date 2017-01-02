import React, { Component, PropTypes as pt } from 'react'
import moment from 'moment'

export default class ItemPlaysRow extends Component {
  static propTypes = {
    item: pt.shape({
      id: pt.number.isRequired,
      name: pt.string.isRequired,
    }),
    plays: pt.arrayOf(pt.shape({
      id: pt.number.isRequired,
      date: pt.instanceOf(moment).isRequired,
    })).isRequired,
    maxPlays: pt.number,
    showOverflow: pt.bool,
  }

  static defaultProps = {
    maxPlays: 10,
    showOverflow: true,
  }

  render () {
    const {item, plays, maxPlays, showOverflow} = this.props

    const playCells = []
    for (let play of plays.slice(0, maxPlays)) {
      playCells.push(
        <td key={`play-${play.id}`}>
          {play.date.format('MMM Do')}
        </td>
      )
    }

    while (playCells.length < maxPlays) {
      playCells.push(
        <td key={`empty-play-${playCells.length}`} />
      )
    }

    return (
      <tr>
        <th>{item.name}</th>
        {playCells}
      </tr>
    )
  }
}
