
import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, removeFromCart ,url} = useContext(StoreContext)

  // ✅ Calculate subtotal
  const getTotalAmount = () => {
    let total = 0
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        total += item.price * cartItems[item._id]
      }
    })
    return total
  }

  const subtotal = getTotalAmount()
  const deliveryFee = subtotal > 0 ? 20 : 0
  const total = subtotal + deliveryFee

  const navigate = useNavigate()
  return (
    <div className='cart' id='cart'>

      {/* Column Titles */}
      <div className="cart-items-title">
        <p>Items</p>
        <p>Name</p>
        <p>Price</p>
        <p>Qty</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {/* Cart Items */}
      {food_list.map((item) => {
        if (cartItems[item._id] > 0) {
          return (
            <div className="cart-items-item" key={item._id}>
              <img src={url+"/images/"+item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>₹{item.price}</p>
              <p>{cartItems[item._id]}</p>
              <p>₹{item.price * cartItems[item._id]}</p>
              <p
                className="cart-remove"
                onClick={() => removeFromCart(item._id)}
              >
                X
              </p>
            </div>
          )
        }
        return null
      })}

      {/* Empty Cart */}
      {subtotal === 0 && (
        <p style={{ textAlign: "center", marginTop: "40px", color: "white" }}>
          Your cart is empty
        </p>
      )}

      {/* Cart Bottom */}
      
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>

            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{subtotal}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{deliveryFee}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{total}</p>
            </div>

            <button  onClick={() => navigate('/placeorder')}>Proceed To Checkout</button>
          </div>
        </div>
      

    </div>
  )
}

export default Cart

