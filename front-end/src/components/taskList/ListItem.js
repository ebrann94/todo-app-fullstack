import React from 'react';
import { connect } from 'react-redux';
import { startCompleteTask, startRemoveOne, completeTask } from '../../store/task-actions';

const ListItem = (props) => {
    const className = props.completed ? 'completed list-item' : 'list-item';

    return (
        <div 
            className={className} 
            onClick={(e) => {
                if (e.target.id !== 'completed-checkbox' && e.target.id !== 'delete-btn') {
                    props.dispatch(startCompleteTask(props._id));
                }
            }}
        >   
            <p>{props.text}</p>
            <div className="list-item__btns">
                <input 
                    type="checkbox" 
                    id="completed-checkbox"
                    className="list-item__checkbox"
                    checked={props.completed}
                    onChange={() =>{
                        props.dispatch(startCompleteTask(props._id));
                    }} 
                />
                <button onClick={(e) => {
                    props.dispatch(startRemoveOne(props._id));
                }}
                    className="list-item__delete"
                    id="delete-btn"
                >
                    X
                </button>
            </div>
        </div>
    );
}

export default connect()(ListItem);