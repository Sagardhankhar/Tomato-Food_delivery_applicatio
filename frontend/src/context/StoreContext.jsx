/* import { createContext, useEffect, useState } from "react";
import './StoreContext.css'
import axios from "axios";

export const StoreContext = createContext(null)
const StoreContextProvider=(props)=>{
    const [cartItems,setCartItems]=useState({});
    const url="http://localhost:4000"
    const [token,setToken]= useState("")
    const [foodlist,setFoodlist]=useState([])
    

    const addToCart= (itemId)=> {
       if(!cartItems[itemId])
       {
          setCartItems((prev)=>({...prev,[itemId]:1}))
       }
       else {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
       }
    }
    const removeFromCart=(itemId)=>{

        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }


    const fetchFoodList= async ()=>
    {
        const response=await axios.get(url+"/api/food/list")
        setFoodlist(response.data.data)
    }
    useEffect(()=>{
        console.log(cartItems);
    },[cartItems])

    useEffect(()=>{
        async function loadData(){
          await fetchFoodList()
          if(localStorage.getItem("token"))
        {
            setToken(localStorage.getItem("token"));
        }
        }
        loadData();
    },[])

    const contextValue={
     food_list,cartItems,setCartItems,addToCart,removeFromCart,url,setToken,token
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider 
*/
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const url = "http://localhost:4000";

  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

  // ➕ ADD TO CART
 const addToCart = async (itemId) => {
  // local state update
  setCartItems((prev) => ({
    ...prev,
    [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
  }));

  // backend update only if logged in
  if (token) {
    await axios.post(
      url + "/api/cart/add",
      { foodId: itemId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
};


  // ➖ REMOVE FROM CART
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId] || prev[itemId] === 1) {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      }
      return { ...prev, [itemId]: prev[itemId] - 1 };
    });
    if (token) {
    await axios.post(
      url + "/api/cart/remove",
      { foodId: itemId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
  };

  // 🍔 FETCH FOOD LIST
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const loadCartData = async (token) => {
  try {
    const response = await axios.get(
      url + "/api/cart/get",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (response.data.success) {
      const cart = response.data.cart;
      let cartObj = {};

      cart.items.forEach((item) => {
        cartObj[item.foodId._id] = item.quantity;
      });

      setCartItems(cartObj);
    }

  } catch (error) {
    console.log(error);
  }
};
 


  // 🔑 LOAD DATA ON START
useEffect(() => {
  fetchFoodList();
  const savedToken = localStorage.getItem("token");
  if (savedToken) {
    setToken(savedToken);
    loadCartData(savedToken);   // 🔥 IMPORTANT
  }
}, []);


  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
