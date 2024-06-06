import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Nav from './Nav/Nav';
import Footer from "./Footer/Footer";

import Home from "./Home/Home";
import SanPham from "./SanPham/SanPham";
import Muahang from "./Muahang/Muahang";
import Chitietsanpham from "./Chitietsanpham/Chitietsanpham";
import User from "./User/User";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* Uncomment Nav if needed */}
          {/* <Nav /> */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<SanPham />} />
            <Route path="/product/:id" element={<Chitietsanpham />} />
            <Route path="/mua/:id" element={<Muahang />} />
            <Route path="/user/:username" element={<User />} />
          </Routes>
          {/* Uncomment Footer if needed */}
          {/* <Footer /> */}
        </header>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
