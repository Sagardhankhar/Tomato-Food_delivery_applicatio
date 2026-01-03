/*import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPop from './components/LoginPop/LoginPop'
const App = () => {
  const [showLogin,setShowLogin]=useState(false)
  return (
    <>
    {showLogin?<LoginPop setShowLogin={ setShowLogin}/>:<></>}
     <div className='app'>
     <Navbar setShowLogin={setShowLogin}></Navbar>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/placeorder' element={<PlaceOrder/>}/>
      </Routes>
    </div>
    <Footer></Footer>
    </>
   

  )
}

export default App */import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Verifyorders from "./pages/Verifyorders/Verifyorders";
import Footer from "./components/Footer/Footer";
import LoginPop from "./components/LoginPop/LoginPop";
import Orders from "./pages/Orders/Orders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* 🔐 Login Popup Overlay */}
      {showLogin && <LoginPop setShowLogin={setShowLogin} />}

      {/* 🌐 App Content */}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verifyorders />} />
          <Route path="/orders" element={<Orders/>}/>
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
