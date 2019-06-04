import React, { useState } from 'react';
import { connect } from 'react-redux';
import { startAddTask } from '../../store/task-actions';

const AddItem = ({ dispatch }) => {
    const [newTask, setNewTask] = useState('');

    return (
        <div className="add-item">
            <form onSubmit={(e) => {
                e.preventDefault();
                if (newTask.length > 0) {
                    dispatch(startAddTask(newTask));
                    setNewTask('');
                }
            }}>
                <input
                    name="newTask"
                    className="add-item__text-input"
                    placeholder="Add a new task..."
                    value={newTask}
                    onChange={(e) => {
                        setNewTask(e.target.value);
                    }}
                />
                <button className="add-item__btn">Add Task</button>
            </form>
        </div>
    );
};

export default connect()(AddItem);