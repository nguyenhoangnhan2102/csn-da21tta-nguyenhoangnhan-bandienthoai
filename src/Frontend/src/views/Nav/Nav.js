import React from "react";
import './Nav.scss';
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Nav = () => {

    const username = sessionStorage.getItem("accessToken");
    console.log("token=", username);

    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [showBar, setshowBar] = useState(false);


    const [hotenKH, sethotenKH] = useState();
    const [avatar, setavatar] = useState();
    const [taikhoan, settaikhoan] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this effect runs once after the first render

    const fetchData = async () => {
        try {
            console.log("username=", username);
            const response = await axios.get(`http://localhost:8080/api/v1/user/info/${username}`, {
                method: "GET",
                mode: "cors",
            });

            console.log("res=", response.data.DT[0]);

            if (+response.data.EC === 1) {
                sethotenKH(response.data.DT[0].hotenKH);
                setavatar(response.data.DT[0].avatar);
                settaikhoan(response.data.DT[0].taikhoan);
            }

        } catch (error) {
            console.error(error.message);
        }
    };

    const handleShowBar = () => {
        setshowBar(!showBar)
        console.log(showBar);
    };

    const handleProfile = () => {
        navigate(`/user/${taikhoan}`);
    }

    const handleLogout = () => {
        setLoggedIn(false);
        setshowBar(false);
        sessionStorage.removeItem('accessToken');
    }

    useEffect(() => {
        if (username) {
            setLoggedIn(true);
        }
    }, [username]);
    return (
        <>
            <div className="topnav">
                <NavLink className="logo_shopphone" to="/" activeClassName="active">
                    Shopphone
                </NavLink>
                <NavLink className="all_product" to="/product" activeClassName="active">
                    Tất cả
                </NavLink>
                {loggedIn ? (
                    <div className="avatar_container">
                        <img
                            className='avatar_nav'
                            src={`http://localhost:8080/public/img/${avatar}`}
                            alt='Avatar'
                            onClick={handleShowBar}
                        />
                        <span style={{ display: 'none' }}>{hotenKH}</span>
                    </div>
                ) : (
                    <NavLink className="nav_login" to="/login" activeClassName="active">
                        Đăng nhập
                    </NavLink>
                )}
            </div>
            {showBar ? (
                <div className="profile_bar">
                    <span className="pro" onClick={handleProfile}>
                        Xem
                    </span>
                    <br></br>
                    <span className="pro" onClick={handleLogout}>
                        Đăng xuất
                    </span>
                </div>
            ) : false}
        </>
    );
}

export default Nav;
