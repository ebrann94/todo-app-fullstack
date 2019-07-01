import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

const TaskListItem = ({ dragStart, dragEnd, index, item }) => {
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
                    // onClick={() => dispatch(completeItem)}
                >
                </div>
                <p
                    className="task__text"
                    contentEditable={!item.completed}
                    suppressContentEditableWarning={true}
                    ref={textField}
                    onInput={(e) => setInputText(e.target.textContent)}
                    // onBlur={() => dispatch(editTaskAction())}
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
                    // onClick={() => dispatch(deleteTaskAction())}
                >
                    X
                </button>
            </div>

        </li>
    )
};

export default connect()(TaskListItem);