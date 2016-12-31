import { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { requestGeekList } from 'tenbyten/actions/geekLists'

class QueryGeekList extends Component {
  static propTypes = {
    listId: pt.number.isRequired,
    inProgress: pt.bool.isRequired,
    loaded: pt.bool.isRequired,
    requestGeekList: pt.func.isRequired,
  }

  componentWillMount () {
    this.request()
  }

  componentWillReceiveProps (newProps) {
    if (this.props.listId !== newProps.listId) {
      this.request()
    }
  }

  request () {
    const { inProgress, listId, loaded, requestGeekList } = this.props
    if (!inProgress && !loaded) {
      requestGeekList(listId)
    }
  }

  render () {
    return null
  }
}

export default connect(
  (state, { listId }) => ({
    listId,
    inProgress: state.requests[`geekList/${listId}`]
                ? state.requests[`geekList/${listId}`].inProgress
                : false,
    loaded: !!(state.geekLists[listId] &&
               state.requests[`geekList/${listId}`]),
  }),
  dispatch => bindActionCreators({requestGeekList}, dispatch),
)(QueryGeekList)
