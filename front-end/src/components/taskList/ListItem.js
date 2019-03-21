import React from 'react';
import { connect } from 'react-redux';
import { startCompleteTask, startRemoveOne } from '../../store/task-actions';

const ListItem = (props) => {
    const className = props.completed ? 'completed list-item' : 'list-item';

    return (
        <div 
            className={className} 
            onClick={(e) => {
                if (e.target.id !== 'completed-checkbox' && e.target.id !== 'delete-button') props.dispatch(startCompleteTask(props._id))
            }}
        >   
            <p>{props.text}</p>
            <div>
                <input 
                    type="checkbox" 
                    onChange={(e) =>{
                        props.dispatch(startCompleteTask(props._id));
                    }} 
                    checked={props.completed}
                    className="list-item__checkbox"
                    id="completed-checkbox"
                />
                <button onClick={(e) => {
                    props.dispatch(startRemoveOne(props._id));
                }}
                    id="delete-button" 
                >Delete</button>
            </div>
        </div>
    );
}

export default connect()(ListItem);