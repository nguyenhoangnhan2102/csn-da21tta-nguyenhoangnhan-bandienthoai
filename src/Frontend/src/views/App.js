// App.jsx
import React from "react";
import './App.scss';

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Nav from './Nav/Nav';
import Footer from "./Footer/Footer";

import Home from "./Home/Home";
import SanPham from "./SanPham/SanPham";
import Muahang from "./Muahang/Muahang";
import Chitietsanpham from "./Chitietsanpham/Chitietsanpham";

function App() {
  return (
    <BrowserRouter forceRefresh={true}>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Switch>
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
          </Switch>
          <Footer />
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
      </div >
    </BrowserRouter>
  );
}

export default App;
