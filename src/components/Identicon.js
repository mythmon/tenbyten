import React, { Component, PropTypes as pt } from 'react'
import IdenticonImg from 'identicon.js'

export default class Identicon extends Component {
  static propTypes = {
    data: pt.string.isRequired,
    margin: pt.number,
    size: pt.number,
    background: pt.arrayOf(pt.number),
  }

  static defaultProps = {
    margin: 0.1,
    size: 20,
    background: [0, 0, 0, 0],
  }

  render () {
    const {data, margin, size, background} = this.props
    const icon = new IdenticonImg(data, {margin, size, background})
    return (
      <img className={`identicon identicon-${size}`} src={`data:image/png;base64,${icon.toString()}`} />
    )
  }
}
