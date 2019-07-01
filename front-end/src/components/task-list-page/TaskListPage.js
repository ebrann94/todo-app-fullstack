import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import List from './old-components/List';
import AddItem from './AddItem';
import RemoveItems from './old-components/RemoveItems';
import ReOrderableList from "./ReOderableList";
import TaskList from "./tasklist/TaskList";

const App = () => {
    return (
        <div className="task-page-container">
            {/*<Header/>*/}
            <div className="sidebar-container">

            </div>
            <main className="main-container">
                <TaskList />
            </main>
        </div>
    );
};

const mapStateToProp = state => ({

});

export default connect()(App);