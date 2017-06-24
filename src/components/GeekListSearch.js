import React from 'react'
import pt from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form.js'
import 'semantic-ui-css/components/form.css'
import { autobind } from 'core-decorators'

import { setSearchUsername } from 'tenbyten/state/geekListSearch/actions'
import QueryGeekListSearch from 'tenbyten/components/data/QueryGeekListSearch'
import GeekListLink from 'tenbyten/components/GeekListLink'
import Spinner from 'tenbyten/components/Spinner'
import { getUsername, getCurrentSearchResults } from 'tenbyten/state/geekListSearch/selectors'

@connect(
  createStructuredSelector({
    username: getUsername,
    searchResults: getCurrentSearchResults,
  }),
  dispatch => bindActionCreators({ setSearchUsername }, dispatch),
)
export default class GeekListSearch extends React.Component {
  static propTypes = {
    username: pt.string.isRequired,
    searchResults: pt.shape({
      list: pt.array.isRequired,
      status: pt.string.isRequired,
      detail: pt.string,
    }),
    setSearchUsername: pt.func.isRequired,
  };

  @autobind
  handleChange (ev) {
    this.props.setSearchUsername(ev.currentTarget.value)
  }

  @autobind
  handleSubmit (ev) {
    ev.preventDefault()
  }

  render () {
    const {username, searchResults} = this.props

    return (
      <div>
        <QueryGeekListSearch />
        <Form size='mini' onSubmit={this.handleSubmit}>
          <Form.Group inline>
            <Form.Input
              label='Username'
              name='username'
              value={username}
              onChange={this.handleChange}
              autoComplete='off'
            />
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
