import React from 'react';
import { connect } from 'react-redux';
import { startSignup } from '../../store/user-actions';

const SignupPage = (props) => {
    return (
        <div className="signup-form">
            <form onSubmit={(e) => {
                e.preventDefault();
                const userInfo = {
                    firstName: e.target.firstName.value,
                    lastName: e.target.lastName.value,
                    email: e.target.email.value,
                    password: e.target.password.value
                }
                props.dispatch(startSignup(userInfo));
            }}>
                <label htmlFor="firstName">First Name: </label>
                <input type="text" name="firstName" />
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" name="lastName" />
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" />
                <input type="submit"/>
            </form>
        </div>
    )
}

export default connect()(SignupPage);