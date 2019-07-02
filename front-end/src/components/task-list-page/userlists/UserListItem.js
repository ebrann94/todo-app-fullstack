import React from 'react';
import { connect } from 'react-redux';
import { setCurrentList } from "../../../store/user-actions";

const UserListsItem = ({ dispatch, id, name, isCurrent }) => {
    const classNames = isCurrent ? 'current-list' : '';
    return (
        <li
            className={'my-lists-item ' + classNames}
            onClick={() => dispatch(setCurrentList(id))}
        >
            <p className="user-lists-item__text">{name}</p>
        </li>
    )
};

export default connect()(UserListsItem);