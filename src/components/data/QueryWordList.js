import { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import wordsActions from 'thedoc/actions/words'

class QueryWordList extends Component {
  static propTypes = {
    inProgress: pt.bool.isRequired,
    loaded: pt.bool.isRequired,
    requestWordList: pt.func.isRequired,
  }

  componentWillMount () {
    this.request()
  }

  request () {
    const { inProgress, loaded, requestWordList } = this.props
    if (!inProgress && !loaded) {
      requestWordList()
    }
  }

  render () {
    return null
  }
}

export default connect(
  state => ({
    inProgress: state.requests.wordList ? state.requests.wordList.inProgress : false,
    loaded: !!(state.words && Object.keys(state.words).length > 0 && state.requests.wordList),
  }),
  dispatch => bindActionCreators(wordsActions, dispatch),
)(QueryWordList)
