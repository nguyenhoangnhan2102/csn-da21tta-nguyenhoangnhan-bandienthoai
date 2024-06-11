import React, { useState } from 'react';
//import { Navigate, useNavigate } from 'react-router-dom';
import './Signup.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

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



            const response = await axios.post('http://localhost:8080/api/v1/confirmSignup', {
                username, password
            });

            if (response.status === 200) {
                console.log("Order confirmed successfully:", response.data);
                toast.success("Đăng ký thành công!!!");
                navigate("/");
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
                    <header>Đăng ký</header>
                    <form>
                        <input
                            type="text"
                            placeholder="Nhập tên đăng nhập"
                            name='username'
                        />
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            name='password'
                        />
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            name="repassword"
                        />
                        <a onClick={alertFunction}>Quên mật khẩu?</a>
                        <button onClick={(event) => handleConfirm(event)} className="button" type="button">Đăng ký</button>
                    </form>
                    <div className="login">
                        <NavLink className="login" to="/login" activeClassName="active">
                            <span>Bạn đã có tài khoản? </span>
                        </NavLink>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Signup;
