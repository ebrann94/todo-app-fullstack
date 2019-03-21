import React from 'react';
import ListItem from './ListItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

class List extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="items-container">
                <TransitionGroup className="todo-list">  
                    {
                        this.props.items.map((item, index) => {
                            return (
                                <CSSTransition
                                    classNames="fade"
                                    timeout={200}
                                    key={item._id}
                                >
                                    <ListItem 
                                        {...item}
                                    />      
                                </CSSTransition>
                            );
                        })
                    }
                </TransitionGroup>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.tasks
    }
}

export default connect(mapStateToProps)(List);