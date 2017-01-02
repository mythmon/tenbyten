import React, { Component, PropTypes as pt } from 'react'
import moment from 'moment'

export default class ItemPlaysRow extends Component {
  static propTypes = {
    play: pt.shape({
      id: pt.number.isRequired,
      date: pt.instanceOf(moment).isRequired,
      comments: pt.string,
      commentsParsed: pt.object,
    }).isRequired,
  }

  static defaultProps = {
    maxPlays: 10,
    showOverflow: true,
  }

  render () {
    const {play: {date, comments, commentsParsed}} = this.props

    let meta = null

    if (commentsParsed) {
      if ('coop' in commentsParsed && 'score' in commentsParsed) {
        meta = <div className='meta'>{commentsParsed.score} points</div>
      } else {
        meta = (
          <div className='meta'>
            <span className='error'>Unrecognized meta</span>
            <pre>
              {JSON.stringify(commentsParsed, null, 2)}
            </pre>
          </div>
        )
      }
    } else if (comments.trim() !== '') {
      meta = <div className='meta'>{comments}</div>
    }

    return (
      <td>
        <div>
          <datetime>{date.format('MMM Do')}</datetime>
        </div>
        {meta}
      </td>
    )
  }
}
