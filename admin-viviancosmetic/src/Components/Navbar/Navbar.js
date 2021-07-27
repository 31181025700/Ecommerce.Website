import React, { Component } from 'react'
import { BrowserRouter, Link, NavLink, Router } from 'react-router-dom';
import './Navbar.css';

export default class Navbar extends Component {
    state = {
        username: "Nguyễn Vĩnh Nghi"
    };

    render() {
        return (
            <div className="container__menu">
                <nav className="menu">
                    <div className="header__logo">
                        <Link to="/" className="header__logo-link">
                            <img src="./assets/img/logo.png" alt="Vivian Cosmetic" 
                            className="header__logo-img"/>
                        </Link>
                    </div>
                    <ul className="menu-list">
                        <li className="menu-item">
                            <a href="/category" className="menu-item__link">Categories</a>
                        </li>
                        <li className="menu-item">
                            <Link to="/product" className="menu-item__link">Products</Link>
                        </li>
                        <li className="menu-item">
                            <a href="/customer" className="menu-item__link">Customer</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

