import React, { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table.js'
import 'semantic-ui-css/components/table.css'
import { createStructuredSelector } from 'reselect'

import { getPlaysByItem } from 'tenbyten/selectors/plays'
import { getGeekList } from 'tenbyten/selectors/geekLists'

import PlaysRow from 'tenbyten/components/PlaysRow'

class PlaysTable extends Component {
  static propTypes = {
    playsByItem: pt.object,
    geekList: pt.shape({
      items: pt.arrayOf(pt.shape({
        id: pt.number.isRequired,
        name: pt.string.isRequired,
      })),
    }),
  }

  render () {
    const {playsByItem, geekList} = this.props

    if (!geekList) {
      return (<span>Loading...</span>)
    }

    const headers = [<Table.HeaderCell key='header-title'>Game</Table.HeaderCell>]
    for (let i = 1; i < 11; i++) {
      headers.push(<Table.HeaderCell key={`header-${i}`}>{i}</Table.HeaderCell>)
    }
    return (
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
  }
}

export default connect(createStructuredSelector({
  playsByItem: getPlaysByItem,
  geekList: getGeekList,
}))(PlaysTable)
