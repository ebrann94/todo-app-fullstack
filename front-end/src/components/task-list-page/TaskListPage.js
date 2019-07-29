import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import UserInfo from './userlists/UserInfo';
import TaskList from "./tasklist/TaskList";
import UserLists from "./userlists/UserLists";
import { getCurrentList } from '../../store/selectors';

const App = ({ isNoLists }) => {
    return (
        <div className="task-page-container">
            {/*<Header/>*/}
            <div className="sidebar-container">
                <UserInfo />
                <UserLists />
            </div>
            <main className="main-container">
                {
                    isNoLists ? (
                        <p>Please Create a List</p>
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