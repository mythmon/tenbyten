import { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { requestPlayList } from 'tenbyten/actions/plays'

class QueryWordEntry extends Component {
  static propTypes = {
    username: pt.string.isRequired,
    inProgress: pt.bool.isRequired,
    loaded: pt.bool.isRequired,
    requestPlayList: pt.func.isRequired,
  }

  componentWillMount () {
    this.request()
  }

  componentWillReceiveProps (newProps) {
    if (this.props.username !== newProps.username) {
      this.request()
    }
  }

  request () {
    const { inProgress, username, loaded, requestPlayList } = this.props
    if (!inProgress && !loaded) {
      requestPlayList(username)
    }
  }

  render () {
    return null
  }
}

export default connect(
  (state, { username }) => ({
    username,
    inProgress: state.requests[`playList/${username}`]
                ? state.requests[`playList/${username}`].inProgress
                : false,
    loaded: !!(state.plays &&
               Object.keys(state.plays).length > 0 &&
               state.requests[`playList/${username}`]),
  }),
  dispatch => bindActionCreators({requestPlayList}, dispatch),
)(QueryWordEntry)
