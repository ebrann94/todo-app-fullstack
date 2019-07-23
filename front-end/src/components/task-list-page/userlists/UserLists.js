import React from 'react';
import { connect } from 'react-redux';
import UserListsItem from './UserListItem';
import AddItem from '../AddItem';
import { startAddList } from '../../../store/list-actions';

const UserLists = ({ dispatch, lists, currentListId }) => {
    return (
        <div className="user-lists-container">
            <h2 className="user-lists__title">My Lists</h2>
            <ul className="user-lists__list">
                {
                    lists.map(list => (
                        <UserListsItem
                            key={list.id}
                            id={list.id}
                            name={list.name}
                            isCurrent={list.id === currentListId}
                        />
                    ))
                }
            </ul>
            <AddItem
                className="add-list"
                actionCreator={startAddList}
                placeholder="Add New List"
            />
        </div>
    )
};

const mapStateTopProps = state => ({
    lists: state.lists,
    currentListId: state.user.currentListId || null
});

export default connect(mapStateTopProps)(UserLists);