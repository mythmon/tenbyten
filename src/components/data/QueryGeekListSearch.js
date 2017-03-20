import { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { searchForGeekLists } from 'tenbyten/actions/geekListSearch'

class QueryGeekListSearch extends Component {
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
    this.request(this.props)
  }

  componentWillReceiveProps (newProps) {
    if (this.props.username !== newProps.username) {
      this.request(newProps)
    }
  }

  request (props) {
    const { username, searchResults, searchForGeekLists } = props

    if (self.requestTimeout) {
      clearTimeout(self.requestTimeout)
      self.requestTimeout = null
    }

    if (username && !(username in searchResults)) {
      self.requestTimeout = setTimeout(() => searchForGeekLists(username), 500)
    }
  }

  render () {
    return null
  }
}

export default connect(
  state => state.geekListSearch,
  dispatch => bindActionCreators({searchForGeekLists}, dispatch),
)(QueryGeekListSearch)
