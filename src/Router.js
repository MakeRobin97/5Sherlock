import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './pages/ScrollToTop';
import Nav from './components/Nav/Nav';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import BestProductList from './pages/Product/BestProductList/BestProductList';
import Signup from './pages/SignUp/SignUp';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ProductList from './pages/Product/ProductList/ProductList';
import Cart from './pages/Cart/Cart';
import Footer from './components/Footer/Footer';
import Order from './pages/Order/Order';
import Gift from './pages/Gift/Gift';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/best-product-list" element={<BestProductList />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/gift" element={<Gift />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
