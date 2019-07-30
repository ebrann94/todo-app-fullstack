import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import UserInfo from './userlists/UserInfo';
import TaskList from "./tasklist/TaskList";
import UserLists from "./userlists/UserLists";

const App = ({ isNoLists }) => {
    return (
        <div className="task-page-container">
            <div className="sidebar-container">
                <UserInfo />
                <UserLists />
            </div>
            <main className="main-container">
                {
                    isNoLists ? (
                        <p className="no-list-message">&lt;-- Click the plus button to the left to add a new list</p>
                    ) : (
                        <TaskList />
                    )
                }
            </main>
        </div>
    );
};

const mapsStateToProps = state => ({
    isNoLists: state.lists.length <= 0
})

export default connect(mapsStateToProps)(App);