import React, { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table.js'
import 'semantic-ui-css/components/table.css'
import moment from 'moment'

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
    startDate: pt.instanceOf(moment).isRequired,
    endDate: pt.instanceOf(moment).isRequired,
    playsByItem: pt.object,
    geekList: pt.shape({
      items: pt.arrayOf(pt.shape({
        id: pt.number.isRequired,
        name: pt.string.isRequired,
      })),
    }),
  }

  render () {
    const {ready, listId, username, playsByItem, geekList, startDate, endDate} = this.props

    let content

    if (ready) {
      const headers = [<Table.HeaderCell key='header-title'>Game</Table.HeaderCell>]
      for (let i = 1; i < 11; i++) {
        headers.push(<Table.HeaderCell key={`header-${i}`}>{i}</Table.HeaderCell>)
      }
      content = (
        <Table fixed celled className='ten-by-ten'>
          <Table.Header>
            <Table.Row>
              {headers}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {geekList.items.map(item => (
              <PlaysRow
                key={`playrow-${item.id}`}
                item={item}
                plays={playsByItem[item.id] || []}
              />
            ))}
          </Table.Body>
        </Table>
      )
    } else {
      content = <span>...</span>
    }

    return (
      <div>
        <QueryPlays username={username} startDate={startDate} endDate={endDate} />
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
  username: state => state.router.params.username,
  listId: state => parseInt(state.router.params.listId),
  startDate: state => moment(state.router.query.startDate, 'YYYY-MM-DD'),
  endDate: state => moment(state.router.query.endDate, 'YYYY-MM-DD'),
}))(TenByTen)
