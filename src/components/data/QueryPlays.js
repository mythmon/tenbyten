import { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { createStructuredSelector } from 'reselect'

import { requestPlayList } from 'tenbyten/state/plays/actions'
import { getUsername, getStartDate, getEndDate } from 'tenbyten/state/challenge/selectors'

@connect(
  createStructuredSelector({
    username: getUsername,
    startDate: getStartDate,
    endDate: getEndDate,
  }),
  dispatch => bindActionCreators({requestPlayList}, dispatch),
)
export default class QueryPlays extends Component {
  static propTypes = {
    username: pt.string.isRequired,
    startDate: pt.instanceOf(moment).isRequired,
    endDate: pt.instanceOf(moment).isRequired,
    requestPlayList: pt.func.isRequired,
  }

  render () {
    const { username, startDate, endDate, requestPlayList } = this.props
    requestPlayList(username, startDate, endDate)
    return null
  }
}
