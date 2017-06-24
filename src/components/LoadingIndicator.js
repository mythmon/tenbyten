import React from 'react'
import pt from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import cx from 'classnames'

import { getAnyRequestLoading } from 'tenbyten/state/requests/selectors'

@connect(createStructuredSelector({
  isLoading: getAnyRequestLoading,
}))
export default class LoadingIndicator extends React.Component {
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
