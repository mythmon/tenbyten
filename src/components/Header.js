import React from 'react'
import { Link } from 'react-router'

export default function Header () {
  return (
    <nav className='navbar'>
      <Link to='/'>
        <span className='logo'>10×10</span>
      </Link>
    </nav>
  )
}
