import React, { Component } from 'react'
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <header className="header-admin">
                <div className="grid">
                    <nav className="header-admin__navbar">
                        <ul className="header-admin__navbar-list">
                            <li className="header-admin__navbar-item header-admin__navbar-user">
                                <span className="header-admin__navbar-user-name">Bảo Nhi</span>
                            </li>
                            <li className="header-admin__navbar-item header-admin__navbar-item--strong">
                                <a href="" className="header-admin__navbar-item--decoration">Logout</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}
