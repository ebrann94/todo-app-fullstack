import React, { useState } from 'react';
import { connect } from 'react-redux';

const AddItem = ({ dispatch, className, placeholder, actionCreator }) => {
    const [inputText, setInputText] = useState('');
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={className}>
            {
                isActive ? (
                    <form
                        className={className + '__form'}
                        onSubmit={e => {
                            e.preventDefault();
                            if (inputText.length > 0) {
                                dispatch(actionCreator(inputText));
                                setInputText('');
                                setIsActive(false);
                            }
                        }}
                    >
                        <input
                            className={className + '__text'}
                            placeholder={placeholder}
                            value={inputText}
                            onChange={e => setInputText(e.target.value)}
                            autoFocus
                            onBlur={() => setIsActive(false)}
                        />
                        <input
                            className={className + '__submit'}
                            type={"submit"}
                            value={"+"}
                        />
                    </form>
                ) : (
                    <button
                        className={className + '__submit'}
                        onClick={() => setIsActive(!isActive)}
                    >
                        +
                    </button>
                )
            }
        </div>
    );
};

export default connect()(AddItem);