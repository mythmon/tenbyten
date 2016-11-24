import React, { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'

import QueryWordEntry from 'thedoc/components/data/QueryWordEntry'

class WordEntry extends Component {
  static propTypes = {
    params: pt.shape({
      slug: pt.string.isRequired,
    }).isRequired,
    entry: pt.shape({
      display: pt.string,
      definition: pt.string,
    }).isRequired,
    loading: pt.bool.isRequired,
  }

  render () {
    const { params: { slug }, entry, loading } = this.props

    return (
      <div>
        <QueryWordEntry slug={slug} />
        <h1>{entry && entry.display}</h1>
        {loading && 'Loading'}
        <p>
          {entry && entry.definition}
        </p>
      </div>
    )
  }
}

export default connect((state, { params }) => ({
  params,
  entry: state.words[params.slug] || {},
  loading: state.requests[`word/${params.slug}`] ? state.requests[`word/${params.slug}`].inProgress : false,
}))(WordEntry)
