import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = () => {

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  // 🔹 FETCH FOOD LIST
  const fetchList = async () => {
    setLoading(true)
    try {
      const res = await axios.get("http://localhost:4000/api/food/list")

      if (res.data.success) {
        setList(res.data.data)
      } else {
        toast.error("Failed to fetch list")
      }

    } catch (error) {
      console.log(error)
      toast.error("Server error")
    } finally {
      setLoading(false)
    }
  }

  // 🔹 LOAD ON PAGE OPEN
  useEffect(() => {
    fetchList()
  }, [])

  // 🔹 REMOVE FOOD
  const removeFood = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/food/removefood",
        { _id: id }
      )

      if (res.data.success) {
        toast.success("Food removed successfully")
        fetchList()
      } else {
        toast.error("Failed to remove food")
      }

    } catch (error) {
      console.log(error)
      toast.error("Server error")
    }
  }

  return (
    <div className="list">

      <h2>Food List</h2>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div className="list-table">

          {/* HEADER */}
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>

          {/* ROWS */}
          {list.length === 0 ? (
            <p className="empty-text">No food items found</p>
          ) : (
            list.map((item) => (
              <div className="list-table-format" key={item._id}>

                <img
                  src={`http://localhost:4000/images/${item.image}`}
                  alt={item.name}
                />

                <p>Name: {item.name}</p>
                <p>Category: {item.category}</p>
                <p>Price: ₹{item.price}</p>

                <button
                  className="list-remove-btn"
                  onClick={() => removeFood(item._id)}
                >
                  Delete
                </button>

              </div>
            ))
          )}

        </div>
      )}
    </div>
  )
}

export default List
