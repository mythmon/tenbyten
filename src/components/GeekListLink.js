import React from 'react'
import pt from 'prop-types'
import { Link } from 'redux-little-router'

export default class GeekListLink extends React.Component {
  static propTypes = {
    title: pt.string.isRequired,
    creator: pt.string.isRequired,
    id: pt.number.isRequired,
  };

  render () {
    const { title, id, creator } = this.props
    return (
      <div>
        <Link href={`/table/${id}/${creator}/`}>{title}</Link>
      </div>
    )
  }
}
