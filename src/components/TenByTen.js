import React, { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment'

import NavFields from 'tenbyten/components/NavFields'
import QueryPlays from 'tenbyten/components/data/QueryPlays'
import QueryGeekList from 'tenbyten/components/data/QueryGeekList'
import PlaysTable from 'tenbyten/components/PlaysTable'
import PlayersList from 'tenbyten/components/PlayersList'
import ChallengeProgress from 'tenbyten/components/ChallengeProgress'

class TenByTen extends Component {
  static propTypes = {
    listId: pt.number.isRequired,
    username: pt.string.isRequired,
    startDate: pt.instanceOf(moment).isRequired,
    endDate: pt.instanceOf(moment).isRequired,
  }

  render () {
    const {listId, username, startDate, endDate} = this.props

    return (
      <div>
        <QueryPlays username={username} startDate={startDate} endDate={endDate} />
        <QueryGeekList listId={listId} />

        <NavFields defaultUsername={username} defaultListId={listId} />
        <div className='row'>
          <div className='row-item collapse'>
            <PlayersList />
          </div>
          <div className='row-item'>
            <ChallengeProgress />
          </div>
        </div>
        <PlaysTable />
      </div>
    )
  }
}

export default connect(createStructuredSelector({
  username: state => state.router.params.username,
  listId: state => parseInt(state.router.params.listId),
  startDate: state => moment(state.router.query.startDate, 'YYYY-MM-DD'),
  endDate: state => moment(state.router.query.endDate, 'YYYY-MM-DD'),
}))(TenByTen)
