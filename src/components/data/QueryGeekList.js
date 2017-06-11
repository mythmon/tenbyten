import React, { PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createStructuredSelector } from 'reselect'

import { requestGeekList } from 'tenbyten/state/geekLists/actions'
import { getListId } from 'tenbyten/state/challenge/selectors'

@connect(
  createStructuredSelector({
    listId: getListId,
  }),
  dispatch => bindActionCreators({requestGeekList}, dispatch),
)
export default class QueryGeekList extends React.Component {
  static propTypes = {
    listId: pt.number.isRequired,
    requestGeekList: pt.func.isRequired,
  };

  render () {
    const { requestGeekList, listId } = this.props
    requestGeekList(listId)
    return null
  }
}
