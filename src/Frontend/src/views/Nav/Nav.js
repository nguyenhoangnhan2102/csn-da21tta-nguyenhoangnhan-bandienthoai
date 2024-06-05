import React from "react";
import './Nav.scss';
import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <div className="topnav">
            <NavLink className="logo_shopphone" to="/" activeClassName="active">
                Shopphone
            </NavLink>
            <NavLink className="all_product" to="/product" activeClassName="active">
                Tất cả
            </NavLink>
            <NavLink className="nav_login" to="/login" activeClassName="active">
                Đăng nhập
            </NavLink>
        </div>
    );
}

export default Nav;
