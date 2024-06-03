import React from "react";
import './Signup.css';

class Signup extends React.Component {
    render() {
        return (
            <>
                <div className="container_signup">
                    <div class="registration form">
                        <header>Signup</header>
                        <form action="#">
                            <input type="text" placeholder="Enter your email" />
                            <input type="password" placeholder="Create a password" />
                            <input type="password" placeholder="Confirm your password" />
                            <input type="button" class="button" value="Signup" />
                        </form>
                        <div class="signup">
                            <span class="signup">Already have an account?
                                <label for="check">Login</label>
                            </span>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Signup;