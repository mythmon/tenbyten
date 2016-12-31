import React from 'react'
import { Link } from 'react-router'

export default function Header () {
  return (
    <nav className='doc-navbar'>
      <Link to='/'>
        <span className='doc-logo'>10x10</span>
      </Link>
    </nav>
  )
}
