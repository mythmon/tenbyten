import React, { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'

import PlaysRow from 'tenbyten/components/PlaysRow'
import NavFields from 'tenbyten/components/NavFields'
import QueryPlays from 'tenbyten/components/data/QueryPlays'
import QueryGeekList from 'tenbyten/components/data/QueryGeekList'
import { getPlaysByItem } from 'tenbyten/selectors/plays'
import { getGeekList } from 'tenbyten/selectors/geekLists'

class TenByTen extends Component {
  static propTypes = {
    ready: pt.bool.isRequired,
    listId: pt.number.isRequired,
    username: pt.string.isRequired,
    playsByItem: pt.object,
    geekList: pt.shape({
      items: pt.arrayOf(pt.shape({
        id: pt.number.isRequired,
        name: pt.string.isRequired,
      })),
    }),
  }

  render () {
    const {ready, listId, username, playsByItem, geekList} = this.props

    let content

    if (ready) {
      const headers = [<th key='header-title'>Game</th>]
      for (let i = 1; i < 11; i++) {
        headers.push(<th key={`header-${i}`}>{i}</th>)
      }
      content = (
        <table className='ten-by-ten'>
          <thead>
            <tr>
              {headers}
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
      content = <span>...</span>
    }

    return (
      <div>
        <QueryPlays username={username} />
        <QueryGeekList listId={listId} />
        <NavFields defaultUsername={username} defaultListId={listId} />
        {content}
      </div>
    )
  }
}

export default connect(createStructuredSelector({
  playsByItem: getPlaysByItem,
  geekList: getGeekList,
  ready: createSelector([getGeekList], geekList => geekList !== null),
  username: (state, props) => props.params.username,
  listId: (state, props) => parseInt(props.params.listId),
}))(TenByTen)
