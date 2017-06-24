import React from 'react'
import pt from 'prop-types'
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label.js'
import 'semantic-ui-css/components/label.css'
import {color, displayName, iconLetter} from 'tenbyten/utils/players'

export default class PlayerLabel extends React.Component {
  static propTypes = {
    player: pt.object.isRequired,
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
