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
import _ from 'lodash'

import weedIcon from 'tenbyten/imgs/icon_weed.svg'
import PlayerIcon from 'tenbyten/components/PlayerIcon'
import * as playerUtils from 'tenbyten/utils/players'

export default class SessionCell extends Component {
  static propTypes = {
    session: pt.shape({
      plays: pt.arrayOf(pt.shape({
        id: pt.number.isRequired,
        date: pt.instanceOf(moment).isRequired,
        comments: pt.string,
        commentsParsed: pt.object,
      })),
      date: pt.instanceOf(moment).isRequired,
    }).isRequired,
  }

  static defaultProps = {
    maxPlays: 10,
    showOverflow: true,
  }

  render () {
    const {session} = this.props

    let info = []
    let icons = []

    info.push(<div name='date' key='date'>{session.date.format('MMM Do')}</div>)

    if (session.plays.length === 1) {
      const play = session.plays[0]

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
      }

      if (play.players.length) {
        const [withScore, withoutScore] =
          _.partition(play.players, player => typeof player.score === 'number')
        withScore.sort((a, b) => b.score - a.score)

        info.push(
          <div name='players' key='players'>
            {withScore.map((player, idx) => (
              <Label
                key={`player-score-${player.id}-${idx}`}
                basic
                color={playerUtils.color(player)}
                className='score-label'
              >
                <span className='points'>
                  {Math.round(player.score)}                  pts
                </span>
                <Label.Detail>
                  <PlayerIcon player={player} />
                </Label.Detail>
              </Label>
            ))}
            {withoutScore.map((player, idx) => (
              <PlayerIcon key={`player-noscore-${player.id}-${idx}`} player={player} />
            ))}
          </div>
        )
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
    } else {
      info.push(
        <div name='plays-count' key='plays-count'>
          {session.plays.length}          plays
        </div>
      )

      const players = {}
      const wins = {}
      for (const play of session.plays) {
        let winner = null
        let hiScore = -Infinity

        for (const player of play.players) {
          if (!(player.id in players)) {
            players[player.id] = player
          }
          if (player.score > hiScore) {
            hiScore = player.score
            winner = player
          }
        }

        if (winner) {
          wins[winner.id] = (wins[winner.id] || 0) + 1
        }
      }

      const [winners, losers] = _.partition(Object.values(players), player => !!wins[player.id])

      info.push(
        <div name='players' key='players'>
          {winners.map((player, idx) => (
            <Label
              key={`player-wins-${player.id}-${idx}`}
              basic
              color={playerUtils.color(player)}
              className='score-label'
            >
              <span className='points'>
                {wins[player.id]}                wins
              </span>
              <Label.Detail>
                <PlayerIcon player={player} />
              </Label.Detail>
            </Label>
            ))}
          {losers.map((player, idx) => (
            <PlayerIcon key={`player-noscore-${player.id}-${idx}`} player={player} />
            ))}
        </div>
      )
    }

    return (
      <Table.Cell>
        <script type='application/json' dangerouslySetInnerHTML={{__html: JSON.stringify(session)}} />
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
