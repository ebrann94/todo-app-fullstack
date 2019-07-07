import React, { useState } from 'react';
import { connect } from 'react-redux';
import { startLogout } from "../../store/user-actions";

const UserInfo = ({ dispatch, user }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    let menuStyles = {
        display: 'none'
    };
    if (menuOpen) {
        menuStyles.display = 'block';
    }

    return (
        <div className="user-info">
            <p>Hi, <span className="user-info__name">{user.firstName}</span></p>
            <button
                className="user-info__more"
                onClick={() => {
                    const clickListener = (e) => {
                        if (e.target.id !== 'logout-btn') {
                            setMenuOpen(false);
                        }
                        window.removeEventListener('mouseup', clickListener);
                    };
                    window.addEventListener('mouseup', clickListener);
                    setMenuOpen(true);
                }}
            >
                <img src="/menu-icon.svg" alt="more user actions" />
            </button>
            <div className="user-info__menu" style={menuStyles}>
                <button
                    className="user-info__logout-btn"
                    id="logout-btn"
                    onClick={() => {
                        dispatch(startLogout());
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
};

export default connect(mapStateToProps)(UserInfo);