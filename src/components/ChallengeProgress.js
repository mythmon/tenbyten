import React, { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import moment from 'moment'
import Progress from 'semantic-ui-react/dist/commonjs/modules/Progress/Progress'
import 'semantic-ui-css/components/progress.css'
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label.js'
import 'semantic-ui-css/components/label.css'

import { getCurrentPlays } from 'tenbyten/selectors/plays'

class PlaysTable extends Component {
  static propTypes = {
    plays: pt.array.isRequired,
    startDate: pt.instanceOf(moment).isRequired,
    endDate: pt.instanceOf(moment).isRequired,
  }

  render () {
    const { plays, startDate, endDate } = this.props

    const timeElapsed = moment().diff(startDate) / endDate.diff(startDate)
    const progress = plays.length / 100

    let color
    if (progress > timeElapsed + 0.01) {
      color = 'green'
    } else if (progress < timeElapsed - 0.01) {
      color = 'red'
    } else {
      color = 'grey'
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

export default connect(createStructuredSelector({
  plays: getCurrentPlays,
  startDate: state => moment(state.router.query.startDate, 'YYYY-MM-DD'),
  endDate: state => moment(state.router.query.endDate, 'YYYY-MM-DD'),
}))(PlaysTable)
