// Nav.jsx
import React from "react";
import './Nav.scss';
import { NavLink } from "react-router-dom";

class Nav extends React.Component {
    render() {
        return (
            <div className="topnav">
                <NavLink to="/" activeClassName="active" exact={true}>
                    <a>Shopphone</a>
                </NavLink>
                <NavLink to="/product" activeClassName="active">
                    <a>Tất cả</a>
                </NavLink>
            </div>
        );
    }
}

export default Nav;

