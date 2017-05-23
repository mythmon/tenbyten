import { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { searchForGeekLists } from 'tenbyten/state/geekListSearch/actions'

@connect(
  state => ({
    username: state.geekListSearch.username,
  }),
  dispatch => bindActionCreators({searchForGeekLists}, dispatch),
)
export default class QueryGeekListSearch extends Component {
  static propTypes = {
    username: pt.string,
    searchForGeekLists: pt.func.isRequired,
  }

  constructor (props) {
    super(props)
    self.requestTimeout = null
  }

  render () {
    const { username, searchForGeekLists } = this.props

    if (self.requestTimeout) {
      clearTimeout(self.requestTimeout)
      self.requestTimeout = null
    }

    if (username) {
      self.requestTimeout = setTimeout(() => searchForGeekLists(username), 1000)
    }

    return null
  }
}
