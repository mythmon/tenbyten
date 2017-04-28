import { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { searchForGeekLists } from 'tenbyten/state/geekListSearch/actions'

@connect(
  state => state.geekListSearch,
  dispatch => bindActionCreators({searchForGeekLists}, dispatch),
)
export default class QueryGeekListSearch extends Component {
  static propTypes = {
    username: pt.string,
    searchResults: pt.object.isRequired,
    searchForGeekLists: pt.func.isRequired,
  }

  constructor (props) {
    super(props)
    self.requestTimeout = null
  }

  componentWillMount () {
    const { username, searchResults, searchForGeekLists } = this.props
    this.request({ username, searchResults, searchForGeekLists })
  }

  componentWillReceiveProps (newProps) {
    if (this.props.username !== newProps.username) {
      this.request(newProps)
    }
  }

  request ({ username, searchResults, searchForGeekLists }) {
    if (self.requestTimeout) {
      clearTimeout(self.requestTimeout)
      self.requestTimeout = null
    }

    if (username && !(username in searchResults)) {
      self.requestTimeout = setTimeout(() => searchForGeekLists(username), 1000)
    }
  }

  render () {
    return null
  }
}
