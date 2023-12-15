import React from "react";
import './App.scss';

import Nav from './Nav/Nav';
import ListProduct from "./List/ListProduct";

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Footer from "./Footer/Footer";
import Product from "./Product/Product";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Product />
          {/* <Switch>
            <Route path="/" exact>
              <ListProduct />
            </Route>
          </Switch> */}
          <Footer />
        </header>
      </div >
    </BrowserRouter>
  );
}

export default App;
