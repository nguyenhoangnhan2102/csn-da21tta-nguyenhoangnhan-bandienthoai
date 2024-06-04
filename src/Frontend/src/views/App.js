import React from "react";
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
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
          <Switch>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/product" exact>
              <SanPham />
            </Route>
            <Route path="/product/:id">
              <Chitietsanpham />
            </Route>
            <Route path="/mua/:id">
              <Muahang />
            </Route>
            <Route path="/user">
              <User />
            </Route>
          </Switch>
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
