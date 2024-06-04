import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.scss';

const Signup = () => {
    const navigate = useNavigate();

    const goToLoginPage = () => {
        navigate('/login');
    };

    return (
        <div className="container_signup">
            <input type="checkbox" id="check" />
            <div className="signup form">
                <h1>Signup</h1>
                <form action="#">
                    <input type="text" placeholder="Nhập email" />
                    <input type="password" placeholder="Nhập mật khẩu" />
                    <input type="password" placeholder="Nhập lại mật khẩu" />
                    <a href="#">Forgot password?</a>
                    <button className="button" value="Login">Sign Up</button>
                </form>
                <div className="login">
                    <span className="login">Don't have an account?
                        <label htmlFor="check" onClick={goToLoginPage}> Login </label>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Signup;
