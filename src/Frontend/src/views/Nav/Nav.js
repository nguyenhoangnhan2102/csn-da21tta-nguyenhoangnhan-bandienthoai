// Nav.jsx
import React from "react";
import './Nav.scss';
import { NavLink } from "react-router-dom";

class Nav extends React.Component {
    render() {
        return (
            <div className="topnav">
                <NavLink className="logo-shopphone" to="/" activeClassName="active" exact={true}>
                    Shopphone
                </NavLink>
                <NavLink className="all-product" to="/product" activeClassName="active">
                    Tất cả
                </NavLink>
            </div>
        );
    }
}

export default Nav;

