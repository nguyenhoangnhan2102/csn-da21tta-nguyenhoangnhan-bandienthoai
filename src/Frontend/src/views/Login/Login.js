import React from "react";
import './Login.scss';

class Login extends React.Component {

    goToSignUpPage = () => {
        this.props.history.push("/product");
    }

    render() {
        return (
            <>
                <div class="container_login">
                    <input type="checkbox" id="check" />
                    <div class="login form">
                        <header>Login</header>
                        <form action="#">
                            <input type="text" placeholder="Enter your email" />
                            <input type="password" placeholder="Enter your password" />
                            <a href="#">Forgot password?</a>
                            <input type="button" class="button" value="Login" />
                        </form>
                        <div class="signup">
                            <span class="signup">Don't have an account?
                                <label for="check" onClick={this.goToSignUpPage}> Signup </label>
                            </span>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Login;