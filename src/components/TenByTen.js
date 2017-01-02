import React, { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'

import PlaysRow from 'tenbyten/components/PlaysRow'
import QueryPlays from 'tenbyten/components/data/QueryPlays'
import QueryGeekList from 'tenbyten/components/data/QueryGeekList'
import { getPlaysByItem } from 'tenbyten/selectors/plays'
import { getGeekList219091 } from 'tenbyten/selectors/geekLists'

class TenByTen extends Component {
  static propTypes = {
    ready: pt.bool.isRequired,
    playsByItem: pt.object,
    geekList: pt.shape({
      items: pt.arrayOf(pt.shape({
        id: pt.number.isRequired,
        name: pt.string.isRequired,
      })),
    }),
  }

  render () {
    const {ready, playsByItem, geekList} = this.props

    let content

    if (ready) {
      content = (
        <table className='ten-by-ten'>
          <thead>
            <tr>
              <th>Game</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>10</th>
            </tr>
          </thead>
          <tbody>
            {geekList.items.map(item => (
              <PlaysRow
                key={`playrow-${item.id}`}
                item={item}
                plays={playsByItem[item.id] || []}
              />
            ))}
          </tbody>
        </table>
      )
    } else {
      content = <span>Not ready</span>
    }

    return (
      <div>
        <QueryPlays username='mythmon' />
        <QueryGeekList listId={219091} />
        {content}
      </div>
    )
  }
}

export default connect(createStructuredSelector({
  playsByItem: getPlaysByItem,
  geekList: getGeekList219091,
  ready: createSelector([getGeekList219091], geekList => geekList !== null),
}))(TenByTen)
