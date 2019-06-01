import React from 'react';
import ListItem from './ListItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

const List = ({ tasks }) => {
    return (
        <div className="list-container">
            <TransitionGroup className="todo-list">
                {
                    tasks.map((task) => {
                        return (
                            <CSSTransition
                                key={task._id}
                                classNames="fade"
                                timeout={200}
                            >
                                <div className="list-item-wrapper"  >
                                    <ListItem
                                        {...task}

                                    />
                                </div>
                            </CSSTransition>
                        );
                    })
                }
            </TransitionGroup>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
};

export default connect(mapStateToProps)(List);