import { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import wordsActions from 'thedoc/actions/words'

class QueryWordEntry extends Component {
  static propTypes = {
    slug: pt.string.isRequired,
    inProgress: pt.bool.isRequired,
    loaded: pt.bool.isRequired,
    requestWordEntry: pt.func.isRequired,
  }

  componentWillMount () {
    this.request()
  }

  componentWillReceiveProps (newProps) {
    if (this.props.slug !== newProps.slug) {
      this.request()
    }
  }

  request () {
    const { inProgress, slug, loaded, requestWordEntry } = this.props
    if (!inProgress && !loaded) {
      requestWordEntry(slug)
    }
  }

  render () {
    return null
  }
}

export default connect(
  (state, { slug }) => ({
    slug,
    inProgress: state.requests[`word/${slug}`] ? state.requests[`word/${slug}`].inProgress : false,
    loaded: !!(state.words[slug] && state.words[slug].definition),
  }),
  dispatch => bindActionCreators(wordsActions, dispatch),
)(QueryWordEntry)
