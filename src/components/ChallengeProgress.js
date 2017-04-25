import React, { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment'
import cx from 'classnames'

import { getCurrentSessions } from 'tenbyten/state/sessions/selectors'
import { getStartDate, getEndDate } from 'tenbyten/state/challenge/selectors'

@connect(createStructuredSelector({
  sessions: getCurrentSessions,
  startDate: getStartDate,
  endDate: getEndDate,
}))
export default class ChallengeProgress extends Component {
  static propTypes = {
    sessions: pt.array.isRequired,
    startDate: pt.instanceOf(moment).isRequired,
    endDate: pt.instanceOf(moment).isRequired,
  }

  render () {
    const { sessions, startDate, endDate } = this.props

    const goal = 100
    const played = sessions.length
    const playedPercent = Math.floor(played / goal * 100)

    const timeElapsedFrac = moment().diff(startDate) / endDate.diff(startDate)

    const target = Math.ceil(timeElapsedFrac * goal)
    const targetPercent = Math.floor(target / goal * 100)

    let behindTarget = (played < target)

    return (
      <div className={cx('ChallengeProgress', {behindTarget})}>
        <div
          className='progress bar'
          style={{
            width: `${playedPercent}%`,
          }}
        />
        <div className='target bar' style={{width: `${targetPercent}%`}} />

        <span className='progress text' style={{flexBasis: `${playedPercent}%`}}>
          Played: {played}
        </span>
        {behindTarget &&
          <span className='target text' style={{flexBasis: `${100 - targetPercent}%`}}>
            Target: {target}
          </span>
        }
      </div>
    )
  }
}
