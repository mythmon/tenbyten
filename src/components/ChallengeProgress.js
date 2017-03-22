import React, { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment'
import Progress from 'semantic-ui-react/dist/commonjs/modules/Progress/Progress'
import 'semantic-ui-css/components/progress.css'

import { getCurrentSessions } from 'tenbyten/state/sessions/selectors'
import { getStartDate, getEndDate } from 'tenbyten/state/challenge/selectors'

@connect(createStructuredSelector({
  sessions: getCurrentSessions,
  startDate: getStartDate,
  endDate: getEndDate,
}))
export default class SessionsTable extends Component {
  static propTypes = {
    sessions: pt.array.isRequired,
    startDate: pt.instanceOf(moment).isRequired,
    endDate: pt.instanceOf(moment).isRequired,
  }

  render () {
    const { sessions, startDate, endDate } = this.props

    const timeElapsed = moment().diff(startDate) / endDate.diff(startDate)
    const progress = sessions.length / 100

    let color
    if (progress < timeElapsed - 0.01) {
      color = 'red'
    } else {
      color = 'green'
    }

    return (
      <div>
        <Progress percent={progress * 100} precision={0} color={color}>
          <Progress percent={timeElapsed * 100} attached='bottom' color='grey' />
        </Progress>
      </div>
    )
  }
}
