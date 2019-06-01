import React from 'react';
import { connect } from 'react-redux';
import { startRemoveAll, startRemoveCompleted } from '../../store/task-actions';

const RemoveItems = ({ dispatch }) => (
    <div className="remove-items">
        <button onClick={() => dispatch(startRemoveAll())} >Remove All</button>
        <button onClick={() => dispatch(startRemoveCompleted())} >Remove Completed</button>
    </div>
);

export default connect()(RemoveItems);