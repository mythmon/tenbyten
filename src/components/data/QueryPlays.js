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
    inProgress: pt.bool.isRequired,
    loaded: pt.bool.isRequired,
    requestPlayList: pt.func.isRequired,
  }

  componentWillMount () {
    this.request(this.props)
  }

  componentWillReceiveProps (newProps) {
    if (this.props.username !== newProps.username ||
        this.props.startDate !== newProps.startDate ||
        this.props.endDate !== newProps.endDate) {
      this.request(newProps)
    }
  }

  request (props) {
    const { inProgress, username, startDate, endDate, loaded, requestPlayList } = props
    if (!inProgress && !loaded) {
      requestPlayList(username, startDate, endDate)
    }
  }

  render () {
    return null
  }
}

export default connect(
  (state, ownProps) => ({
    ...ownProps,
    inProgress: state.requests[`playList/${ownProps.username}`]
                ? state.requests[`playList/${ownProps.username}`].inProgress
                : false,
    loaded: !!(state.plays &&
               Object.keys(state.plays).length > 0 &&
               state.requests[`playList/${ownProps.username}`]),
  }),
  dispatch => bindActionCreators({requestPlayList}, dispatch),
)(QueryPlays)
