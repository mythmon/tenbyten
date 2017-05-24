// @flow
import React from 'react'
import { Link } from 'redux-little-router'

export default class GeekListLink extends React.Component {
  props: {
    title: string,
    creator: string,
    id: number,
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
