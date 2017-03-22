import React, { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table.js'
import 'semantic-ui-css/components/table.css'
import { createStructuredSelector } from 'reselect'

import { getCurrentSessionsByItem } from 'tenbyten/state/sessions/selectors'
import { getCurrentGeekList } from 'tenbyten/state/geekLists/selectors'

import SessionsRow from 'tenbyten/components/SessionsRow'

class SessionsTable extends Component {
  static propTypes = {
    sessionsByItem: pt.object,
    geekList: pt.shape({
      items: pt.arrayOf(pt.shape({
        id: pt.number.isRequired,
        name: pt.string.isRequired,
      })),
    }),
  }

  render () {
    const {sessionsByItem, geekList} = this.props

    if (!geekList) {
      return (<span>Loading...</span>)
    }

    const headers = [<Table.HeaderCell key='header-title'>Game</Table.HeaderCell>]
    for (let i = 1; i <= 10; i++) {
      headers.push(<Table.HeaderCell key={`header-${i}`}>{i}</Table.HeaderCell>)
    }

    const sortedGeekListItems = [ ...geekList.items ].sort((a, b) => {
      let alen = (sessionsByItem[a.id] || []).length
      let blen = (sessionsByItem[b.id] || []).length
      return blen - alen
    })

    return (
      <Table fixed celled className='ten-by-ten'>
        <Table.Header>
          <Table.Row>
            {headers}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedGeekListItems.map(item => (
            <SessionsRow
              key={item.id}
              item={item}
              sessions={sessionsByItem[item.id] || []}
            />
          ))}
        </Table.Body>
      </Table>
    )
  }
}

export default connect(createStructuredSelector({
  sessionsByItem: getCurrentSessionsByItem,
  geekList: getCurrentGeekList,
}))(SessionsTable)
