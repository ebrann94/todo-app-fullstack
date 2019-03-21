import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../store/user-actions';

const LoginPage = (props) => {


    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                const userInfo = {
                    email: e.target.email.value,
                    password: e.target.password.value
                }
                props.dispatch(startLogin(userInfo));
                e.target.reset();
            }}>
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" />
                <input type="submit" />
            </form>
            <p>Don't have an account: </p>
            <Link to="/signup">Signup</Link>
        </div>

    );
};



export default connect()(LoginPage);