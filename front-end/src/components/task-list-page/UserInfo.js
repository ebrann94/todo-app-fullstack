import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from "../../store/user-actions";

const UserInfo = ({ dispatch, user }) => {
    return (
        <div>
            <p>Logged In as {user.firstName}</p>
            <button
                onClick={e => {
                    dispatch(startLogout());
                }}
            >
                Logout
            </button>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
};

export default connect(mapStateToProps)(UserInfo);