import React, { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment'

import NavFields from 'tenbyten/components/NavFields'
import QueryPlays from 'tenbyten/components/data/QueryPlays'
import QueryGeekList from 'tenbyten/components/data/QueryGeekList'
import SessionsTable from 'tenbyten/components/SessionsTable'
import PlayersList from 'tenbyten/components/PlayersList'
import ChallengeProgress from 'tenbyten/components/ChallengeProgress'
import * as challegeSelector from 'tenbyten/selectors/challenge'

class TenByTen extends Component {
  static propTypes = {
    listId: pt.number.isRequired,
    username: pt.string.isRequired,
    startDate: pt.instanceOf(moment),
    endDate: pt.instanceOf(moment),
  }

  render () {
    const {listId, username, startDate, endDate} = this.props

    return (
      <div>
        <QueryPlays username={username} startDate={startDate} endDate={endDate} />
        <QueryGeekList listId={listId} />

        <NavFields
          defaultUsername={username}
          defaultListId={listId}
          defaultStartDate={startDate}
          defaultEndDate={endDate}
        />
        <div className='row'>
          <div className='row-item collapse'>
            <PlayersList />
          </div>
          <div className='row-item'>
            <ChallengeProgress />
          </div>
        </div>
        <SessionsTable />
      </div>
    )
  }
}

export default connect(createStructuredSelector({
  username: challegeSelector.getUsername,
  listId: challegeSelector.getListId,
  startDate: challegeSelector.getStartDate,
  endDate: challegeSelector.getEndDate,
}))(TenByTen)
