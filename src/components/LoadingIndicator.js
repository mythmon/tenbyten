import React, { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import cx from 'classnames'

import { getAnyRequestLoading } from 'tenbyten/selectors/requests'

class LoadingIndicator extends Component {
  static propTypes = {
    isLoading: pt.bool.isRequired,
  }

  render () {
    const {isLoading} = this.props

    return (
      <div className={cx('loading-indicator', {active: isLoading})} />
    )
  }
}

export default connect(createStructuredSelector({
  isLoading: getAnyRequestLoading,
}))(LoadingIndicator)
