import React, { Component, PropTypes as pt } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form.js'
import 'semantic-ui-css/components/form.css'
import * as geekListSearchActions from 'tenbyten/actions/geekListSearch'
import QueryGeekListSearch from 'tenbyten/components/data/QueryGeekListSearch'
import GeekListLink from 'tenbyten/components/GeekListLink'
import Spinner from 'tenbyten/components/Spinner'
import { getUsername, getCurrentSearchResults } from 'tenbyten/selectors/geekListSearch'

class GeekListSearch extends Component {
  static propTypes = {
    username: pt.string.isRequired,
    searchResults: pt.shape({
      list: pt.array,
      status: pt.string.isRequired,
      detail: pt.string,
    }),
    setSearchUsername: pt.func.isRequired,
  }

  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.navigate = this.navigate.bind(this)
  }

  handleChange (ev) {
    this.props.setSearchUsername(ev.target.value)
  }

  navigate (ev) {
    ev.preventDefault()
    const {name, list, startDate, endDate} = this.state
    const onGithub = window.location.hostname.indexOf('github.io') !== -1
    let newUrl = `/table/${list}/${name}/?startDate=${startDate}&endDate=${endDate}`
    if (onGithub) {
      newUrl = '/tenbyten' + newUrl
    }
    window.location = newUrl
  }

  render () {
    const {username, searchResults} = this.props

    return (
      <div>
        <QueryGeekListSearch />
        <Form size='mini' onSubmit={this.navigate}>
          <Form.Group inline>
            <Form.Input label='Username' name='username' value={username} onChange={this.handleChange} />
            {searchResults && searchResults.status === 'pending' && <Spinner />}
          </Form.Group>
        </Form>
        {searchResults && searchResults.status === 'success' &&
          <ul>
            {searchResults.list.map(result => (
              <GeekListLink key={result.id} {...result} creator={username} />
            ))}
          </ul>
        }
      </div>
    )
  }
}

export default connect(
  createStructuredSelector({
    username: getUsername,
    searchResults: getCurrentSearchResults,
  }),
  dispatch => bindActionCreators(geekListSearchActions, dispatch),
)(GeekListSearch)
