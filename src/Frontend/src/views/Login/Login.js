import React, { useState } from 'react';
import './Login.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', { username: email, password });
            toast.success(response.data.message);
            console.log(response);
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    const alertFunction_login = () => {
        toast.info("Chức năng đang phát triển. Vui lòng thử lại sau");
    }

    return (
        <>
            <Nav />
            <div className="container_login">
                <input type="checkbox" id="check" />
                <div className="login form">
                    <header>Login</header>
                    <form onSubmit={handleLogin}>
                        <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <a onClick={alertFunction_login}> Forgot password? </a>
                        <button className="button" type="submit">Login</button>
                    </form>
                    <div className="signup">
                        <NavLink className="signup" to="/signup" activeClassName="active">
                            <span>Don't have an account?</span>
                        </NavLink>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Login;
