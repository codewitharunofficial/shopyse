import React from 'react'
// import Layout from './Components/Layout'
// import Header from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
// import Home from './Components/Home';
import Navbar from './Components/Navbar';
import HomePage from './Components/Homepage';
import ProductDetailsPage from './Components/ProductDetailsPage';
import CartPage from './Components/CartPage';
import Home from './Components/Home';

const App = () => {
  return (
    <>
    <Navbar/>
<Routes>
  <Route path='/' element={<HomePage/>} />
  <Route path='/product-details/:slug' element={<ProductDetailsPage/>} />
  <Route path='/cart' element={<CartPage/>} />


</Routes>
    
    </>
  )
}

export default App