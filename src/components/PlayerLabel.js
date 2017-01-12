import React, { Component, PropTypes as pt } from 'react'
import createHash from 'sha.js'
import { COLORS } from 'semantic-ui-react/dist/commonjs/lib/SUI'
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label.js'
import 'semantic-ui-css/components/label.css'

export default class PlayerLabel extends Component {
  static propTypes = {
    player: pt.shape({
      id: pt.string.isRequired,
      name: pt.string,
      username: pt.string,
    }).isRequired,
  }

  render () {
    const {player: {id, name, username}} = this.props

    let hasher = createHash('sha256').update(id).update(name).update(username)
    let idHash = parseInt(hasher.digest('hex'), 16)
    let color = COLORS[idHash % COLORS.length]

    let displayName = name || username || id
    let firstLetter = displayName.slice(0, 1).toUpperCase()

    return (
      <Label basic color={color} className='player-label'>
        {displayName}
        <Label.Detail>
          <Label circular color={color} size='mini'>{firstLetter}</Label>
        </Label.Detail>
      </Label>
    )
  }
}
