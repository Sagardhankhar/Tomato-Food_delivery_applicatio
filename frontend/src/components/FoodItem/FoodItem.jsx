import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
const FoodItem = ({id,name,price,description,image}) => {
    const {cartItems,addToCart,removeFromCart,url}= useContext(StoreContext);
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-img' src={url+"/images/"+image} alt=""/>
            {
                !cartItems[id]
                ? <img 
                    className='add' 
                    onClick={() => addToCart(id)} 
                    src={assets.add_icon_white} 
                    alt="" 
                  />
                : <div className='food-item-counter'>
                    <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} />
                    <p>{cartItems[id]}</p>
                    <img src={assets.add_icon_green} onClick={()=>addToCart(id)} />
                  </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt=""/>
            </div>
            <p className="food-item-des">{description}</p>
            <p className="food-item-price">Rs{price}</p>
        </div>
    </div>
  )
}

export default FoodItem