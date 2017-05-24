// @flow
import React from 'react'
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
  props: {
    listId: number,
    requestGeekList: number => void,
  };

  render () {
    const { requestGeekList, listId } = this.props
    requestGeekList(listId)
    return null
  }
}
