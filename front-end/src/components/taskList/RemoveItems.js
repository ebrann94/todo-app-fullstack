import React from 'react';
import { connect } from 'react-redux';
import { startRemoveAll, startRemoveCompleted } from '../../store/task-actions';

const RemoveItems = (props) => (
    <div className="remove-items">
        <button onClick={() => props.dispatch(startRemoveAll())} >Remove All</button>
        <button onClick={() => props.dispatch(startRemoveCompleted())} >Remove Completed</button>
    </div>
);

export default connect()(RemoveItems);