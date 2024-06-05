import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.scss';
import { NavLink } from 'react-router-dom';
import Nav from '../Nav/Nav';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    // const navigate = useNavigate();
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    // const handleSubmit = async (event) => {
    //     event.preventDefault(); // Prevent default form submission

    //     const response = await fetch('/api/signup', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ username, password }),
    //     });

    const alertFunction = () => {
        toast.info("Chức năng đang phát triển. Vui lòng thử lại sau!!!")
    }

    return (
        <>
            <Nav />
            <div className="container_signup">
                <input type="checkbox" id="check" />
                <div className="signup form">
                    <h1>Signup</h1>
                    <form action="#">
                        <input type="text" placeholder="Enter your email" name='username' />
                        <input type="password" placeholder="Enter your password" />
                        <input type="password" placeholder="Re-enter your password" />
                        <a onClick={alertFunction}>Forgot password?</a>
                        <button className="button" value="Login">Sign Up</button>
                    </form>
                    <div className="login">
                        <NavLink className="login" to="/login" activeClassName="active">
                            <label>Already have an account? </label>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
