// @flow
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form.js'
import 'semantic-ui-css/components/form.css'
import { autobind } from 'core-decorators'

import * as geekListSearchActions from 'tenbyten/state/geekListSearch/actions'
import QueryGeekListSearch from 'tenbyten/components/data/QueryGeekListSearch'
import GeekListLink from 'tenbyten/components/GeekListLink'
import Spinner from 'tenbyten/components/Spinner'
import { getUsername, getCurrentSearchResults } from 'tenbyten/state/geekListSearch/selectors'

import type { SearchResult } from 'tenbyten/state/geekListSearch/types.js'

@connect(
  createStructuredSelector({
    username: getUsername,
    searchResults: getCurrentSearchResults,
  }),
  dispatch => bindActionCreators(geekListSearchActions, dispatch),
)
export default class GeekListSearch extends React.Component {
  props: {
    username: string,
    searchResults: {
      list: Array<SearchResult>,
      status: string,
      detail: ?string,
    },
    setSearchUsername: (string) => void,
  };

  @autobind
  handleChange (ev: Event & { currentTarget: HTMLInputElement }): void {
    this.props.setSearchUsername(ev.currentTarget.value)
  }

  render (): React$Element<{}> {
    const {username, searchResults} = this.props

    return (
      <div>
        <QueryGeekListSearch />
        <Form size='mini'>
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
            {searchResults.list.map((result: SearchResult.list) => (
              <GeekListLink key={result.id} {...result} creator={username} />
            ))}
          </ul>
        }
      </div>
    )
  }
}
