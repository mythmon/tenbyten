// @flow
import React from 'react'
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label.js'
import 'semantic-ui-css/components/label.css'
import {color, displayName, iconLetter} from 'tenbyten/utils/players'

import type { Player } from 'tenbyten/state/players/types.js'

export default class PlayerLabel extends React.Component {
  props: {
    player: Player,
  };

  render () {
    const {player} = this.props

    return (
      <Label circular color={color(player)} size='mini' title={displayName(player)}>
        {iconLetter(player)}
      </Label>
    )
  }
}
