import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../store/user-actions';

const LoginPage = (props) => {

    // console.log(props);
    return (
        <div className="login-container">
            <h1>Log In</h1>
            <form 
                className="login-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    const userInfo = {
                        email: e.target.email.value,
                        password: e.target.password.value
                    }

                    props.dispatch(startLogin(userInfo));
                    e.target.reset();
                }}
            >
                <div className="login__email-input login__input">
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" required/>
                </div>
                <div className="login__password-input login__input">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" required />
                </div>
                <input type="submit" value="Login" className="login__submit"/>
            </form>
            <p>{props.loginError}</p>
            <div className="signup-link">
                <p>Don't have an account? </p>
                <Link to="/signup">Signup</Link>
            </div>
        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        ...state.user
    }
}

export default connect(mapStateToProps)(LoginPage);