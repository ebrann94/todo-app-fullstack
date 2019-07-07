import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { startDeleteTask, startEditTask } from '../../../store/task-actions';

const TaskListItem = ({ dispatch, dragStart, dragEnd, index, item, currentListId }) => {
    const [inputText, setInputText] = useState(item.text);
    const textField = useRef(null);

    return (
        <li
            className="task"
            draggable
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            data-index={index}
        >
            <div className='task__left'>
                <div
                    className={item.completed ? 'task__check-mark task__check-mark--completed': 'task__check-mark'}
                    onClick={() => dispatch(startEditTask(currentListId, item._id, { completed: !item.completed }))}
                >
                </div>
                <p
                    className="task__text"
                    contentEditable={!item.completed}
                    suppressContentEditableWarning={true}
                    ref={textField}
                    onInput={(e) => setInputText(e.target.textContent)}
                    onBlur={() => {
                        if (inputText.length > 0 && inputText !== item.text) {
                            dispatch(startEditTask(currentListId, item._id, { text: inputText }))
                        }
                    }}
                    onKeyDown={e => {
                        if (e.keyCode === 13) {
                            e.preventDefault();
                            e.target.blur();
                        }
                    }}
                >
                    {item.text}
                </p>
            </div>
            <div className="task__btns">
                <button
                    name="delete-btn"
                    className="task__delete"
                    onClick={() => dispatch(startDeleteTask(currentListId, item._id))}
                >
                    X
                </button>
            </div>

        </li>
    )
};

const mapStateToProps = state => ({
    currentListId: state.user.currentListId || state.lists[0].id
});

export default connect(mapStateToProps)(TaskListItem);