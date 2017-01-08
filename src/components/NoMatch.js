import React from 'react'
import { Link } from 'redux-little-router'

/**
 * 404-ish view shown for routes that don't match any valid route.
 */
export default function NoMatch () {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Sorry, I have no idea what you mean.</p>
      <Link href='/'>Return to the index</Link>
    </div>
  )
}
