import { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import { requestPlayList } from 'tenbyten/actions/plays'

class QueryPlays extends Component {
  static propTypes = {
    username: pt.string.isRequired,
    startDate: pt.instanceOf(moment).isRequired,
    endDate: pt.instanceOf(moment).isRequired,
    requestState: pt.shape({
      inProgress: pt.bool.isRequired,
      error: pt.object,
    }),
    requestPlayList: pt.func.isRequired,
  }

  componentWillMount () {
    this.request(this.props)
  }

  componentWillReceiveProps (newProps) {
    if (this.props.username !== newProps.username ||
        !this.props.startDate.isSame(newProps.startDate) ||
        !this.props.endDate.isSame(newProps.endDate)) {
      this.request(newProps)
    }
  }

  request (props) {
    const { username, startDate, endDate, requestState, requestPlayList } = props
    if (!requestState) {
      requestPlayList(username, startDate, endDate)
    }
  }

  render () {
    return null
  }
}

export default connect(
  (state, {username, startDate, endDate}) => {
    let fmt = 'YYYY-MM-DD'
    let requestKey = `playList/${username}/${startDate.format(fmt)}/${endDate.format(fmt)}`

    return {
      username,
      startDate,
      endDate,
      requestState: state.requests[requestKey],
    }
  },
  dispatch => bindActionCreators({requestPlayList}, dispatch),
)(QueryPlays)
