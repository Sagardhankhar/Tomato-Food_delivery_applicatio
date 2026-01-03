import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="logo-box">
        <img className='logo1' src={assets.logo} alt="logo" />
      </div>
      <img className='profile' src={assets.profile_image} alt="profile" />
    </div>
  )
}

export default Navbar
