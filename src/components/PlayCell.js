import React, { Component, PropTypes as pt } from 'react'
import moment from 'moment'
import FaQuestionCircle from 'react-icons/lib/fa/question-circle'
import FaCommentingO from 'react-icons/lib/fa/commenting-o'
import FaExclamationTriangle from 'react-icons/lib/fa/exclamation-triangle'
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table.js'
import 'semantic-ui-css/components/table.css'
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label.js'
import 'semantic-ui-css/components/label.css'
import yaml from 'js-yaml'

import weedIcon from 'tenbyten/imgs/icon_weed.svg'
import PlayerIcon from 'tenbyten/components/PlayerIcon'
import * as playerUtils from 'tenbyten/utils/players'

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

    let commentsParsed = {}
    if (play.commentsParsed) {
      commentsParsed = {...play.commentsParsed}
    } else if (play.comments && play.comments.trim() !== '') {
      icons.push(
        <span name='comments' key='comments' title={play.comments}>
          <FaCommentingO />
        </span>
      )
    }

    if ('score' in commentsParsed) {
      info.push(<div name='score' key='score'>{commentsParsed.score} points</div>)
      delete commentsParsed.score
    } else {
      const playersByScore = play.players.filter(player => typeof player.score === 'number')
      playersByScore.sort((a, b) => b.score - a.score)
      if (playersByScore.length) {
        info.push(
          <div name='score' key='score'>
            {playersByScore.map((player, idx) => (
              <Label
                key={`player-score-${player.id}-${idx}`}
                basic
                color={playerUtils.color(player)}
                className='score-label'
              >
                <span className='points'>
                  {Math.round(player.score)} pts
                </span>
                <Label.Detail>
                  <PlayerIcon player={player} />
                </Label.Detail>
              </Label>
            ))}
          </div>
        )
      }
    }

    if ('state' in commentsParsed) {
      if (commentsParsed.state === 'high') {
        icons.push(<img name='state-high' key='state-high' src={weedIcon} title='State: High' />)
        delete commentsParsed.state
      }
    }

    if (Object.keys(commentsParsed).length > 0) {
      icons.push(
        <span name='extra' key='extra' title={yaml.safeDump(commentsParsed)}>
          <FaQuestionCircle />
        </span>
      )
    }

    if (play.players.length === 0) {
      icons.push(
        <span name='warning-players' key='warning-players' title='No players recorded'>
          <FaExclamationTriangle />
        </span>
      )
    }

    return (
      <Table.Cell>
        <div className='play-cell'>
          <div className='info-set'>
            {info}
          </div>
          <div className='icon-set'>
            {icons}
          </div>
        </div>
      </Table.Cell>
    )
  }
}
