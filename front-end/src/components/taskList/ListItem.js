import React from 'react';
import { connect } from 'react-redux';
import { startCompleteTask, startRemoveOne, completeTask } from '../../store/task-actions';

const ListItem = ({ dispatch, ...task}) => {
    const className = task.completed ? 'completed list-item' : 'list-item';

    return (
        <div 
            className={className} 
            onClick={(e) => {
                if (e.target.id !== 'completed-checkbox' && e.target.id !== 'delete-btn') {
                    dispatch(startCompleteTask(task._id));
                }
            }}
        >   
            <p>{task.text}</p>
            <div className="list-item__btns">
                <input 
                    type="checkbox" 
                    id="completed-checkbox"
                    className="list-item__checkbox"
                    checked={task.completed}
                    onChange={() =>{
                        dispatch(startCompleteTask(task._id));
                    }} 
                />
                <button
                    className="list-item__delete"
                    id="delete-btn"
                    onClick={() => {
                        dispatch(startRemoveOne(task._id));
                    }}
                >
                    X
                </button>
            </div>
        </div>
    );
}

export default connect()(ListItem);