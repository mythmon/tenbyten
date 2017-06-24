import React from 'react'
import pt from 'prop-types'
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label.js'
import 'semantic-ui-css/components/label.css'

import PlayerIcon from 'tenbyten/components/PlayerIcon'
import * as playerUtils from 'tenbyten/utils/players'

export default class PlayerLabel extends React.Component {
  static propTypes = {
    player: pt.shape({
      id: pt.string.isRequired,
      name: pt.string,
      username: pt.string,
    }).isRequired,
  }

  render () {
    const {player} = this.props

    return (
      <Label basic color={playerUtils.color(player)} className='player-label'>
        {playerUtils.displayName(player)}
        <Label.Detail>
          <PlayerIcon player={player} />
        </Label.Detail>
      </Label>
    )
  }
}
