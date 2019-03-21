import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../store/user-actions';

const Header = (props) => (
    <div className="header">
       <h1>To Do List</h1>
       {props.loggedIn ? <p>Logged in as: {props.user.firstName}</p> : <Link to="/login" >Login</Link>}
       {props.loggedIn &&
             <button onClick={(e) => {
                 props.dispatch(startLogout());
             }}>Logout</button>}
    </div>
);

const mapStateToProps = (state) => {
    return {
        ...state.user
    }
}

export default connect(mapStateToProps)(Header);