// App.jsx
import React from "react";
import './App.scss';

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import Nav from './Nav/Nav';
import Footer from "./Footer/Footer";

import ListProduct from "./ListProduct/ListProduct";
import SanPham from "./SanPham/SanPham";
import InfoProduct from "./InfoProduct/InfoProduct";

function App() {
  return (
    <BrowserRouter forceRefresh={true}>
      <div className="App">
        <header className="App-header">
          <Nav />

          <Switch>
            <Route path="/" exact>
              <ListProduct />
            </Route>
            <Route path="/product" exact>
              <SanPham />
            </Route>
            <Route path="/product/:id">
              <InfoProduct />
            </Route>
          </Switch>
          <Footer />
        </header>
      </div >
    </BrowserRouter>
  );
}

export default App;
