import React, { Component, PropTypes as pt } from 'react'
import moment from 'moment'
import FaQuestionCircle from 'react-icons/lib/fa/question-circle'
import FaExclamationCircle from 'react-icons/lib/fa/exclamation-circle'

import weedIcon from 'tenbyten/imgs/icon_weed.svg'

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
    const {play} = this.props

    let info = []
    let icons = []

    info.push(<div name='date' key='date'>{play.date.format('MMM Do')}</div>)

    if (play.commentsParsed) {
      let commentsParsed = {...play.commentsParsed}

      if ('score' in commentsParsed) {
        info.push(<div name='score' key='score'>{commentsParsed.score} points</div>)
        delete commentsParsed.score
      }

      if ('state' in commentsParsed) {
        if (commentsParsed.state === 'high') {
          icons.push(<img name='state-high' key='state-high' src={weedIcon} title='State: High' />)
          delete commentsParsed.state
        }
      }

      if (Object.keys(commentsParsed).length > 0) {
        icons.push(
          <span name='extra' key='extra' title={JSON.stringify(commentsParsed, null, 2)}>
            <FaQuestionCircle />
          </span>
        )
      }
    } else if (play.comments && play.comments.trim() !== '') {
      icons.push(
        <span name='comments' key='comments' title={play.comments}>
          <FaExclamationCircle />
        </span>
      )
    }

    return (
      <td className='play-cell'>
        <div className='info'>
          {info}
        </div>
        <div className='icons'>
          {icons}
        </div>
      </td>
    )
  }
}
