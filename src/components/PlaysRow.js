import React, { Component, PropTypes as pt } from 'react'
import moment from 'moment'
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table.js'
import 'semantic-ui-css/components/table.css'

import PlayCell from 'tenbyten/components/PlayCell'

export default class ItemPlaysRow extends Component {
  static propTypes = {
    item: pt.shape({
      id: pt.number.isRequired,
      name: pt.string.isRequired,
    }),
    plays: pt.arrayOf(pt.shape({
      id: pt.number.isRequired,
      date: pt.instanceOf(moment).isRequired,
      comments: pt.string,
      commentsParsed: pt.object,
    })).isRequired,
    maxPlays: pt.number,
    showOverflow: pt.bool,
  }

  static defaultProps = {
    maxPlays: 10,
    showOverflow: true,
  }

  render () {
    const {item, plays, maxPlays} = this.props

    const playCells = []
    for (let play of plays.slice(0, maxPlays)) {
      playCells.push(
        <PlayCell key={`play-cell-${play.id}`} play={play} />
      )
    }

    while (playCells.length < maxPlays) {
      playCells.push(
        <Table.Cell key={`empty-play-${playCells.length}`} />
      )
    }

    let averagePlayTime = null
    const playTimes = plays.map(play => play.length).filter(a => a > 0)
    if (playTimes.length > 0) {
      averagePlayTime = Math.round(playTimes.reduce((a, b) => a + b, 0) / playTimes.length)
    }

    return (
      <Table.Row>
        <Table.Cell>
          <header>
            {item.name}
          </header>
          {averagePlayTime !== null &&
            <div name='average-play-time'>
              Ø {averagePlayTime} mins
            </div>
          }
        </Table.Cell>
        {playCells}
        <script type='application/json' dangerouslySetInnerHTML={{__html: JSON.stringify(this.props)}} />
      </Table.Row>
    )
  }
}
