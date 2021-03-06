import React from 'react'
import pt from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment'

import NavFields from 'tenbyten/components/NavFields'
import QueryPlays from 'tenbyten/components/data/QueryPlays'
import QueryGeekList from 'tenbyten/components/data/QueryGeekList'
import SessionsTable from 'tenbyten/components/SessionsTable'
import PlayersList from 'tenbyten/components/PlayersList'
import ChallengeProgress from 'tenbyten/components/ChallengeProgress'
import * as challegeSelector from 'tenbyten/state/challenge/selectors'

@connect(createStructuredSelector({
  username: challegeSelector.getUsername,
  listId: challegeSelector.getListId,
  startDate: challegeSelector.getStartDate,
  endDate: challegeSelector.getEndDate,
}))
export default class TenByTen extends React.Component {
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
        <QueryPlays />
        <QueryGeekList />

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
