import React from 'react';
import { connect } from 'react-redux';
import ReOrderableList from '../ReOderableList';
import AddItem from '../AddItem';
import { startAddTask } from '../../../store/task-actions';
import { startDeleteList } from '../../../store/list-actions';
import { setCurrentList } from '../../../store/user-actions';
import { getCurrentList } from '../../../store/selectors';

const TaskList = ({ dispatch, list }) => {

    const startAddTaskPartial = listId => {
        return text => startAddTask(listId, text);
    };

    return (
        <div className="task-list-container">
            <div className="task-list__top">
                <h1 className="task-list__title">{list && list.name.toUpperCase()}</h1>
                <button
                    className="task-list__delete"
                    onClick={() => dispatch(startDeleteList(list.id))}
                >
                    X
                </button>
            </div>
            <ReOrderableList
                items={list.tasks}
                listId={list.id}
                className={'task-list'}
            />
            <AddItem
                className="add-task"
                actionCreator={startAddTaskPartial(list.id)}
                placeholder="Add New Task"
            />
        </div>
    )
};

const mapStateToProps = state => {
    // const list = getCurrentList(state.lists, state.user.currentListId);

    // if (!list) {

    // }

    return {
        list: getCurrentList(state.lists, state.user.currentListId)
    }
};

export default connect(mapStateToProps)(TaskList);