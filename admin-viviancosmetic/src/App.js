import './App.css';
import React from 'react';
import Navbar from './Components/Navbar/Navbar.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Components/Header/Header';
import Product from './Components/Product/Product';
import AddProduct from './Components/AddProduct/AddProduct';
import UpdateProduct from './Components/UpdateProduct/UpdateProduct';
import Category from './Components/Category/Category';
import AddCategory from './Components/AddCategory/AddCategory';
import UpdateCategory from './Components/UpdateCategory/UpdateCategory';
import Customer from './Components/Customer/Customer';

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
              <Route exact path="/product" component={Product} />
              <Route exact path="/product/add" component={AddProduct} />
              <Route exact path="/product/update/:id" component={UpdateProduct} />
              <Route exact path="/category" component={Category} />
              <Route exact path="/category/add" component={AddCategory} />
              <Route exact path="/category/update/:id" component={UpdateCategory} />
              <Route exact path="/customer" component={Customer} />
            </Switch>
          </div>

        </div>
      </BrowserRouter>
    );
  }

}


export default App;
