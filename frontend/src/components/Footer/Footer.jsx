import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id="footer">
    <div className="footer-content">
        <div className="footer-content-left"> 
            <img src={assets.logo} alt=""/>
            <p> Delicious food delivered to your doorstep.  
          Fast, fresh & affordable.</p>
          <div className='footer-social-icons'>
            <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" /><img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-centre">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Get In Touch</h2>
            <ul>
                <li>+91-7404776960</li>
                <li>tomato477@gmail.com</li>
            </ul>
        </div>
    </div>
    <p className="footer-copyright">
        Copyright 2026 @ tomato477@gmail.com - All Right Reserved.
    </p>
    </div>
  )
}

export default Footer