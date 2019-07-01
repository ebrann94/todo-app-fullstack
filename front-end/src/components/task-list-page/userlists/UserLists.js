import React from 'react';
import { connect } from 'react-redux';
import UserListsItem from './UserListItem';
import AddItem from '../AddItem';

const UserLists = ({ lists, currentList }) => {
    return (
        <div className="user-lists-container">
            <h2 className="user-lists__title">My Lists</h2>
            <ul>
                {
                    lists.map(list => (
                        <UserListsItem
                            key={list.id}
                            id={list.id}
                            name={list.name}
                            isCurrent={list.id === currentList}
                        />
                    ))
                }
            </ul>
            <AddItem
                // action={addListAction}
                className="add-list"
            />
        </div>
    )
};

const mapStateTopProps = state => ({

});

export default connect(mapStateTopProps)(UserLists);