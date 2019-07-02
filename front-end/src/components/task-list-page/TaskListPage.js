import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import UserInfo from './UserInfo';
import TaskList from "./tasklist/TaskList";
import UserLists from "./userlists/UserLists";

const App = ({ lists, currentListId }) => {

    const list = lists.find(list => list.id === currentListId);
    // console.log(currentListId, list);
    return (
        <div className="task-page-container">
            {/*<Header/>*/}
            <div className="sidebar-container">
                <UserInfo />
                <UserLists />
            </div>
            <main className="main-container">
                <TaskList
                    list={list || lists[0]}
                />
            </main>
        </div>
    );
};

const mapStateToProps = state => ({
    lists: state.lists,
    currentListId: state.user.currentListId,
});

export default connect(mapStateToProps)(App);