import React from 'react';
import { connect } from 'react-redux';
import { startAddTask } from '../../store/task-actions';

const AddItem = (props) => (
    <div className="add-item">
        <form onSubmit={(e) => {
            e.preventDefault();
            const text = e.target.addItem.value;
            props.dispatch(startAddTask(text));
            e.target.reset();
        }}>
            <input name="addItem" className="add-item__text-input" placeholder="Add a new item..."/>
            <button className="add-item__btn">Add Item</button>
        </form>
    </div>
);

export default connect()(AddItem);