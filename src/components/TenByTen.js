import React, { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'

import QueryPlays from 'tenbyten/components/data/QueryPlays'
import QueryGeekList from 'tenbyten/components/data/QueryGeekList'

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
    geekList: pt.shape({
      items: pt.arrayOf(pt.shape({
        id: pt.number.isRequired,
        name: pt.string.isRequired,
      })),
    }),
    state: pt.object,
  }

  render () {
    const {state, plays, geekList} = this.props

    console.log('TenByTen::render - geekList', geekList)

    return (
      <div>
        <QueryPlays username='gca3020' />
        <QueryGeekList listId={219091} />

        <ul>
          {geekList && geekList.items.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>

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
  geekList: state.geekLists[219091]
    ? {
      id: state.geekLists[219091].id,
      items: state.geekLists[219091].items.map(itemId => state.items[itemId]),
    }
    : undefined,
  state,
}))(TenByTen)
