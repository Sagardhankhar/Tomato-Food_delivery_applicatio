/*
import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
const Sidebar = () => {
    
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <div className="sidebar-option">
                <img src={assets.addicon} alt=""/>
                <p>Add Items</p>
            </div>
                <div className="sidebar-option">
                <img src={assets.listitems1} alt=""/>
                <p>List Items</p>
            </div>
                <div className="sidebar-option">
                <img src={assets.listitems1} alt=""/>
                <p>Orders</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
*/
import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()

  return (
    <div className='sidebar'>
      <div className="sidebar-options">

        <div className="sidebar-option" onClick={() => navigate('/add')}>
          <img src={assets.addicon} alt="Add" />
          <p>Add Items</p>
        </div>

        <div className="sidebar-option" onClick={() => navigate('/list')}>
          <img src={assets.listitems1} alt="List" />
          <p>List Items</p>
        </div>

        <div className="sidebar-option" onClick={() => navigate('/orders')}>
          <img src={assets.listitems1} alt="Orders" />
          <p>Orders</p>
        </div>

      </div>
    </div>
  )
}

export default Sidebar
