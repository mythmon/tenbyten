import React from 'react'
import pt from 'prop-types'
import { connect } from 'react-redux'
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table.js'
import 'semantic-ui-css/components/table.css'
import { createStructuredSelector } from 'reselect'

import { getCurrentSessionsByItem } from 'tenbyten/state/sessions/selectors'
import { GeekList, getCurrentGeekList } from 'tenbyten/state/geekLists/selectors'

import SessionsRow from 'tenbyten/components/SessionsRow'

@connect(createStructuredSelector({
  sessionsByItem: getCurrentSessionsByItem,
  geekList: getCurrentGeekList,
}))
export default class SessionsTable extends React.Component {
  static propTypes = {
    sessionsByItem: pt.object,
    geekList: pt.instanceOf(GeekList),
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
