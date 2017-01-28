import React, { Component, PropTypes as pt } from 'react'
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label.js'
import 'semantic-ui-css/components/label.css'
import {color, displayName, iconLetter} from 'tenbyten/utils/players'

export default class PlayerLabel extends Component {
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
      <Label circular color={color(player)} size='mini' title={displayName(player)}>
        {iconLetter(player)}
      </Label>
    )
  }
}
