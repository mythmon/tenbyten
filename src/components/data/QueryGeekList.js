import { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { requestGeekList } from 'tenbyten/state/geekLists/actions'

@connect(
  (state, { listId }) => ({
    requestState: state.requests[`geekList/${listId}`],
  }),
  dispatch => bindActionCreators({requestGeekList}, dispatch),
)
export default class QueryGeekList extends Component {
  static propTypes = {
    listId: pt.number.isRequired,
    requestState: pt.shape({
      inProgress: pt.bool.isRequired,
      error: pt.object,
    }),
    requestGeekList: pt.func.isRequired,
  }

  componentWillMount () {
    const {listId, requestState, requestGeekList} = this.props
    this.request({listId, requestState, requestGeekList})
  }

  componentWillReceiveProps (newProps) {
    if (this.props.listId !== newProps.listId) {
      this.request(newProps)
    }
  }

  request ({ listId, requestState, requestGeekList }) {
    if (!requestState) {
      requestGeekList(listId)
    }
  }

  render () {
    return null
  }
}
