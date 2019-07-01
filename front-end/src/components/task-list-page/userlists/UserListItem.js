import React from 'react';

const UserListsItem = ({ id, name, isCurrent }) => {
    const classNames = isCurrent ? 'current-list' : '';
    return (
        <li
            className={'my-lists-item ' + classNames}
            // onClick={() => dispatch(selectListAction(id))}
        >
            <p className="user-lists-item__text">{name}</p>
        </li>
    )
};

export default UserListsItem;