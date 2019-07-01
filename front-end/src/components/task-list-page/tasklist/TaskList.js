import React from 'react';
import { connect } from 'react-redux';
import ReOrderableList from '../ReOderableList';
import AddItem from '../AddItem';

const TaskList = ({ list }) => {
    return (
        <div className="task-list-container">
            <div className="task-list__top">
                <h1 className="task-list__title">{list.name.toUpperCase()}</h1>
                <button
                    className="task-list__delete"
                    // onClick={() => dispatch(deleteListAction())}
                >
                    X
                </button>
            </div>
            <ReOrderableList />
            <AddItem
                // action={addTaskAction}
                className="add-task"
            />
        </div>
    )
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(TaskList);