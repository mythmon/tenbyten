import React, { Component, PropTypes as pt } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import QueryWordList from 'thedoc/components/data/QueryWordList'

class WordList extends Component {
  static propTypes = {
    words: pt.arrayOf(pt.shape({
      slug: pt.string.isRequired,
      display: pt.string.isRequired,
    })).isRequired,
  }

  render () {
    const {words} = this.props

    return (
      <div>
        <QueryWordList />
        <ul>
          {words.map(word => (
            <li key={word.slug}><Link to={`/word/${word.slug}`}>{word.display}</Link></li>
          ))}
        </ul>
      </div>
    )
  }
}

export default connect(state => ({
  words: Object.values(state.words || {}).sort((a, b) => {
    if (a.display > b.display) {
      return 1
    } else if (a.display < b.display) {
      return -1
    } else {
      return 0
    }
  }),
}))(WordList)
