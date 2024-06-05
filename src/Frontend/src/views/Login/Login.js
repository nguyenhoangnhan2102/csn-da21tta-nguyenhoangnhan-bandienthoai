import React from 'react';
import './Login.scss';
import { NavLink } from 'react-router-dom';
import Nav from '../Nav/Nav';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const alertFunction_login = () => {
        toast.info("Chức năng đang phát triển. Vui lòng thử lại sau")
    }

    return (
        <>
            <Nav />
            <div className="container_login">
                <input type="checkbox" id="check" />
                <div className="login form">
                    <header>Login</header>
                    <form action="#">
                        <input type="text" placeholder="Enter your email" />
                        <input type="password" placeholder="Enter your password" />
                        <a onClick={alertFunction_login}> Forgot password? </a>
                        <button className="button" value="Login">Login</button>
                    </form>
                    <div className="signup">
                        <NavLink className="signup" to="/signup" activeClassName="active">
                            <span>Don't have an account?</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
