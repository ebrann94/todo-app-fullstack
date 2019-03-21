import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import TaskListPage from './components/taskList/TaskListPage';
import LoginPage from './components/login/LoginPage';
import SignupPage from './components/signup/SignupPage';
import { getUserInfo } from './store/user-actions';

class App extends React.Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem('token')) {
            props.dispatch(getUserInfo());
        }
    }

    componentDidUpdate() {
        // localStorage.setItem('tasks', JSON.stringify(this.state.items));
    }

    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route 
                        path="/" 
                        exact={true} 
                        component={this.props.loggedIn ? TaskListPage : LoginPage}
                    />
                    <Route 
                        path="/login" 
                        component={LoginPage}
                    />
                    <Route 
                        path="/signup" 
                        component={SignupPage} 
                    />
                    {/* <Route path="/account" component={} /> */}
                </Switch>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.user
    }
}

export default connect(mapStateToProps)(App);