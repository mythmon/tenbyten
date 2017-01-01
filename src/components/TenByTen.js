import React, { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import QueryPlays from 'tenbyten/components/data/QueryPlays'
import QueryGeekList from 'tenbyten/components/data/QueryGeekList'
import { getPlays } from 'tenbyten/selectors/plays'
import { getGeekList219091 } from 'tenbyten/selectors/geekLists'

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
    const {plays, geekList} = this.props

    return (
      <div>
        <QueryPlays username='mythmon' />
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

export default connect(createStructuredSelector({
  plays: getPlays,
  geekList: getGeekList219091,
}))(TenByTen)
