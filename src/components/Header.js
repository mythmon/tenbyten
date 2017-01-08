import React from 'react'
import { Link } from 'redux-little-router'

export default function Header () {
  return (
    <nav className='navbar'>
      <Link href='/'>
        <span className='logo'>10×10</span>
      </Link>
    </nav>
  )
}
