import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Signup.scss';
import { NavLink } from 'react-router-dom';
import Nav from '../Nav/Nav';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleConfirm = async (e) => {
        try {
            e.preventDefault();

            const username = document.querySelector('input[name="username"]').value.trim();
            const password = document.querySelector('input[name="password"]').value.trim();
            const repassword = document.querySelector('input[name="repassword"]').value.trim();

            console.log(username);
            console.log(password);
            console.log(repassword);

            if (password !== repassword) {
                toast.error("Mật khẩu không trùng khớp!!!");
                return;
            }

            const response = await axios.post('http://localhost:8080/confirmSignup', {
                username, password
            });

            if (response.status === 200) {
                console.log("Order confirmed successfully:", response.data);
                toast.success("Đăng ký thành công!!!");
            } else {
                console.error("Unexpected response status:", response.status);
                toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
    };

    const alertFunction = () => {
        toast.info("Chức năng đang phát triển. Vui lòng thử lại sau!!!");
    }

    return (
        <>
            <Nav />
            <div className="container_signup">
                <input type="checkbox" id="check" />
                <div className="signup form">
                    <h1>Signup</h1>
                    <form>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            name='username'
                        />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            name='password'
                        />
                        <input
                            type="password"
                            placeholder="Re-enter your password"
                            name="repassword"
                        />
                        <a onClick={alertFunction}>Forgot password?</a>
                        <button onClick={(event) => handleConfirm(event)} className="button" type="button">Sign Up</button>
                    </form>
                    <div className="login">
                        <NavLink className="login" to="/login" activeClassName="active">
                            <label>Already have an account? </label>
                        </NavLink>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Signup;
