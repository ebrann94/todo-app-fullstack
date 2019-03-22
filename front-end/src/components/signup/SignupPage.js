import React from 'react';
import { connect } from 'react-redux';
import { startSignup } from '../../store/user-actions';
import { withRouter } from 'react-router';

const SignupPage = (props) => {
    return (
        <div className="login-container">
            <h1>Sign Up</h1>
            <form 
                className="login-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    const userInfo = {
                        firstName: e.target.firstName.value,
                        lastName: e.target.lastName.value,
                        email: e.target.email.value,
                        password: e.target.password.value
                    }
                    props.dispatch(startSignup(userInfo));
                }}
            >
                <div className="login__input">
                    <label htmlFor="firstName">First Name: </label>
                    <input type="text" name="firstName" />
                </div>
                <div className="login__input">
                    <label htmlFor="lastName">Last Name: </label>
                    <input type="text" name="lastName" />
                </div>
                <div className="login__input">
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" />
                </div>
                <div className="login__input">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" />
                </div>
                <input type="submit" value="Sign Up" className="login__submit"/>
            </form>
        </div>
    )
}

export default withRouter(connect()(SignupPage));