import React from "react";
import './App.scss';

import Nav from './Nav/Nav';
import ListProduct from "./List/ListProduct";

import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Switch>
            <Route path="/" exact>
              <ListProduct />
            </Route>
          </Switch>
        </header>
      </div >
    </BrowserRouter>
  );
}

export default App;
