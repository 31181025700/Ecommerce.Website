import './App.css';
import React from 'react';
import Navbar from './Components/Navbar/Navbar.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Components/Header/Header';
import Product from './Components/Product/Product';
import AddProduct from './Components/AddProduct/AddProduct';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="grid__row">
          <div className="grid__column-2">
            <Navbar />
          </div>
          <div className="grid__column-10">
            <Header />
            <Switch>
              <Route exact path="/product">
                <Product />
              </Route>
              <Route exact path="/product/add">
                <AddProduct />
              </Route>
            </Switch>
          </div>

        </div>
      </BrowserRouter>
    );
  }

}


export default App;
