import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

import { useContext } from 'react';
const Navbar = ({setShowLogin}) => {
  const [menu,setMenu]=useState('menu');
  const {token, setToken}= useContext(StoreContext);
  const navigate= useNavigate();

  const logout=()=>{
     localStorage.removeItem("token");
     setToken("");
     // afterlogout return to the homepage
     navigate("/");
  }

  return (
    <div className='navbar'>
       <Link to='/'><img src={assets.logo} alt="" className='logo'></img></Link> 
        <ul className="navbar-menu">
          <Link to='/' onClick={() => setMenu("Home")}className={`navbar-items ${menu === "home" ? "active" : ""}`}>Home</Link>

<a href='#explore-menu' onClick={() => setMenu("Menu")} className={`navbar-items ${menu === "menu" ? "active" : ""}`}>Menu</a>
<a href='#app-download' onClick={() => setMenu("Mobile-app")}className={`navbar-items ${menu === "mobile-app" ? "active" : ""}`}>Mobile-app</a>
<a href='#footer' onClick={() => setMenu("Contact-us")}className={`navbar-items ${menu === "contact-us" ? "active" : ""}`}>Contact-us</a>

        </ul>
        <div className="navbar-right">
           <img className="nav-icon" src={assets.searchicons} alt="" /> 
            <div className="navbar-search-icon">
             <Link to='/cart'><img className="nav-icon" src={assets.basketimage} alt="" /></Link>
                <div className="dot"></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>Sign-in</button>:
            <div className="navbar-proile">
  <img src={assets.profile_icon} alt="" />
  <ul className="nav-profile-dropdown">
    
    {/* ✅ Orders Page */}
   <li onClick={() => navigate("/orders")}>
  <img src={assets.bag_icon} alt="" />
  <p>Orders</p>
</li>


    <hr />

    {/* ✅ Logout */}
    <li onClick={logout}>
      <img src={assets.logout_icon} alt="" />
      <p>Log-out</p>
    </li>

  </ul>
</div>

              }
        </div>
    </div>
  )
}

export default Navbar