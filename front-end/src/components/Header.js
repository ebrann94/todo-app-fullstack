import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../store/user-actions';

const Header = (props) => (
    <div className="header">
       <h1>To Do List</h1>
       <div className="user-info">
           <p>Logged in as: {props.user.firstName}</p>
            <button onClick={(e) => {
                props.dispatch(startLogout());
            }}>Logout</button>
       </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        ...state.user
    }
}

export default connect(mapStateToProps)(Header);