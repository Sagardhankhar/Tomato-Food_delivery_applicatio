/* import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {
  const { cartItems, food_list } = useContext(StoreContext)

  // calculate total
  const getTotalAmount = () => {
    let total = 0
    food_list.forEach(item => {
      if (cartItems[item._id] > 0) {
        total += item.price * cartItems[item._id]
      }
    })
    return total
  }

  const subtotal = getTotalAmount()
  const deliveryFee = subtotal > 0 ? 20 : 0
  const total = subtotal + deliveryFee

  return (
    <div className="place-order">

      {/* LEFT FORM *
      <div className="place-order-left">
        <h2>Delivery Information</h2>

        <div className="place-order-inputs">
          <input type="text" placeholder="First Name" />
          <input type='text' placeholder="Last Name"/>
          <input type='text' placeholder='Email'/>
          <input type="text" placeholder="Street" />
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
          <input type="text" placeholder="Pincode" />
          <input type="text" placeholder="Phone Number" />
        </div>
      </div>

      {/* RIGHT SUMMARY 
      <div className="place-order-right">
        <h2>Order Summary</h2>

        <div className="order-summary">
          <div>
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>
          <div>
            <p>Delivery Fee</p>
            <p>₹{deliveryFee}</p>
          </div>
          <hr />
          <div className="order-total">
            <p>Total</p>
            <p>₹{total}</p>
          </div>
        </div>

        <button>Proceed to Payment</button>
      </div>

    </div>
  )
}

export default PlaceOrder */
/*
import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useEffect } from 'react'
import { useState } from 'react'

const PlaceOrder = () => {
  const { cartItems, food_list,token,url } = useContext(StoreContext)
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    pincode:"",
    phone:""
  })
     let orderItems=[];
       
  // calculate subtotal
       const getTotalAmount = () => {
        let total = 0
         food_list.forEach(item => {
         if (cartItems[item._id] > 0) {
           total += item.price * cartItems[item._id]
           }
         })
         return total
        }

         const subtotal = getTotalAmount()
         const deliveryFee = subtotal > 0 ? 20 : 0
         const total = subtotal + deliveryFee

    //create onchangehandler function to store information in it 
    const onchangehandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))
    }
    const placeorder=async (event)=>{
         event.preventDefault();
         orderItems.push(subtotal);
         orderItems.push(deliveryFee);
         orderItems.push(total);
         console.log(orderItems);
}
useEffect(()=>{
console.log(data)
},[data])
  return (
    <div onSubmit={placeorder}  className="place-order">

     
      <div className="place-order-left">
        <h2>Delivery Information</h2>

        <div className="place-order-inputs">
          <input className="half" name='firstName' onChange={onchangehandler} value={data.firstName} type="text" placeholder="First Name" />
          <input className="half" name='lastName' onChange={onchangehandler} value={data.lastName} type="text" placeholder="Last Name" />

          <input className="full" name='email' onChange={onchangehandler} value={data.email}  type="text" placeholder="Email" />

          <input className="full" name='street' onChange={onchangehandler} value={data.street}  type="text" placeholder="Street" />

          <input className="half" name='city' onChange={onchangehandler} value={data.city}  type="text" placeholder="City" />
          <input className="half" name='state' onChange={onchangehandler} value={data.state}  type="text" placeholder="State" />

          <input className="half" name='pincode' onChange={onchangehandler} value={data.pincode}  type="text" placeholder="Pincode" />
          <input className="half" name='phone' onChange={onchangehandler} value={data.phone}  type="text" placeholder="Phone" />
        </div>
      </div>

  
      <div className="place-order-right">
        <h2>Order Summary</h2>

        <div className="order-summary">
          <div>
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>

          <div>
            <p>Delivery Fee</p>
            <p>₹{deliveryFee}</p>
          </div>

          <hr />

          <div className="order-total">
            <p>Total</p>
            <p>₹{total}</p>
          </div>
        </div>

        <button type='submit'>Proceed to Payment</button>
      </div>

    </div>
  )
}

export default PlaceOrder
*/
import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {
  const { cartItems, food_list, token, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: ""
  })

  // 🧮 Calculate subtotal
  const getTotalAmount = () => {
    let total = 0
    food_list.forEach(item => {
      if (cartItems[item._id] > 0) {
        total += item.price * cartItems[item._id]
      }
    })
    return total
  }

  const subtotal = getTotalAmount()
  const deliveryFee = subtotal > 0 ? 20 : 0
  const total = subtotal + deliveryFee

  // ✏️ Handle input change
  const onchangehandler = (event) => {
    const { name, value } = event.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  // 🛒 PLACE ORDER
 const placeOrder = async (event) => {
  event.preventDefault();

  const orderItems = [];

  food_list.forEach(item => {
    if (cartItems[item._id] > 0) {
      orderItems.push({
        foodId: item._id,
        quantity: cartItems[item._id]
      });
    }
  });

  const addressPayload = {
    fullName: data.firstName + " " + data.lastName,
    phone: data.phone,
    street: data.street,
    city: data.city,
    state: data.state,
    pincode: data.pincode
  };

  const response = await axios.post(
    url + "/api/order/place",
    {
      items: orderItems,
      amount: total,
      address: addressPayload
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (response.data.success) {
    window.location.replace(response.data.sessionUrl);
  }
};



  useEffect(() => {
    console.log("Address Data:", data)
  }, [data])

  return (
    <form onSubmit={placeOrder} className="place-order">

      {/* ===== LEFT : DELIVERY INFO ===== */}
      <div className="place-order-left">
        <h2>Delivery Information</h2>

        <div className="place-order-inputs">
          <input className="half" required name="firstName" value={data.firstName} onChange={onchangehandler} placeholder="First Name" />
          <input className="half" required name="lastName" value={data.lastName} onChange={onchangehandler} placeholder="Last Name" />

          <input className="full" required name="email" value={data.email} onChange={onchangehandler} placeholder="Email" />
          <input className="full" required name="street" value={data.street} onChange={onchangehandler} placeholder="Street" />

          <input className="half" required name="city" value={data.city} onChange={onchangehandler} placeholder="City" />
          <input className="half" required name="state" value={data.state} onChange={onchangehandler} placeholder="State" />

          <input className="half" required name="pincode" value={data.pincode} onChange={onchangehandler} placeholder="Pincode" />
          <input className="half" required name="phone" value={data.phone} onChange={onchangehandler} placeholder="Phone" />
        </div>
      </div>

      {/* ===== RIGHT : ORDER SUMMARY ===== */}
      <div className="place-order-right">
        <h2>Order Summary</h2>

        <div className="order-summary">
          <div>
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>

          <div>
            <p>Delivery Fee</p>
            <p>₹{deliveryFee}</p>
          </div>

          <hr />

          <div className="order-total">
            <p>Total</p>
            <p>₹{total}</p>
          </div>
        </div>

        <button type="submit">Proceed to Payment</button>
      </div>

    </form>
  )
}

export default PlaceOrder
