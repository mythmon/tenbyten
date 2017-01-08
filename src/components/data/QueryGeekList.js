import { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { requestGeekList } from 'tenbyten/actions/geekLists'

class QueryGeekList extends Component {
  static propTypes = {
    listId: pt.number.isRequired,
    requestState: pt.shape({
      inProgress: pt.bool.isRequired,
      error: pt.object,
    }),
    requestGeekList: pt.func.isRequired,
  }

  componentWillMount () {
    this.request(this.props)
  }

  componentWillReceiveProps (newProps) {
    if (this.props.listId !== newProps.listId) {
      this.request(newProps)
    }
  }

  request (props) {
    const { listId, requestState, requestGeekList } = props
    if (!requestState) {
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
    requestState: state.requests[`geekList/${listId}`],
  }),
  dispatch => bindActionCreators({requestGeekList}, dispatch),
)(QueryGeekList)
