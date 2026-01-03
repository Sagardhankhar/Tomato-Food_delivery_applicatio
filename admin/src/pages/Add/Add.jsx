
import React, { useState } from 'react'
import './Add.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Add = () => {

  const [image, setImage] = useState(null)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  })

  // input change handler
  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  // submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!image) {
      toast.error("Please upload an image")
      return
    }

    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("category", data.category)
    formData.append("image", image)
    // apis ko call karega backend se connect karne k liye 
    try {
      const res = await axios.post(
        "http://localhost:4000/api/food/add",
        formData
      )

      if (res.data.success) {
        toast.success("Food item added")

        // reset form
        setData({
          name: "",
          description: "",
          price: "",
          category: ""
        })
        setImage(null)
        toast.success(Response.data.message)

      } else {
        toast.error("Failed to add food")
        
      }

    } catch (error) {
      console.log(error)
      toast.error("Server error")
    }
  }

  return (
    <div className="add">
      <h2>Add Food Item</h2>

      <form className="add-form" onSubmit={onSubmitHandler}>

        {/* IMAGE UPLOAD WITH PREVIEW */}
        <div className="add-img-upload">
          <p>Upload Image</p>

          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload"
            />
          </label>

          <input
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        {/* PRODUCT NAME */}
        <div className="add-input">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Food name"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="add-input">
          <p>Description</p>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            placeholder="Food description"
            rows="5"
            required
          />
        </div>

        {/* CATEGORY + PRICE */}
        <div className="add-category-price">

          <div className="add-input">
            <p>Category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              required
            >
              <option value="">Select category</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-input">
            <p>Price</p>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="₹20"
              required
            />
          </div>

        </div>

        {/* BUTTON */}
        <button type="submit" className="add-btn">
          Add Item
        </button>

      </form>
    </div>
  )
}

export default Add
