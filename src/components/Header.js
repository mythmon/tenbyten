import React from 'react'
import { Link } from 'react-router'

export default function Header () {
  return (
    <nav className='doc-navbar'>
      <Link to='/'>
        <span className='doc-logo'>DOC</span>
        <span>
          {' - '}
          Documentation of Culture
        </span>
      </Link>
    </nav>
  )
}
