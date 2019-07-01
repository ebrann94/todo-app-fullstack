import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import TaskListPage from './components/task-list-page/TaskListPage';
import LoginPage from './components/login/LoginPage';
import SignupPage from './components/signup/SignupPage';
import { getUserInfo } from './store/user-actions';

class App extends React.Component {
    constructor(props) {
        super(props);
        
        if (localStorage.getItem('token') || localStorage.getItem('token') === 'undefined') {
            props.dispatch(getUserInfo());
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/"
                        exact={true}
                        render={(routeProps) => (
                            this.props.loggedIn ? (
                                <TaskListPage {...routeProps}/>
                            ) : (
                                <Redirect to="/login"/>
                            )
                        )}
                    />
                    <Route
                        path="/login"
                        render={(routeProps) => (
                            this.props.loggedIn ? (
                                <Redirect to="/"/>
                            ) : (
                                <LoginPage {...routeProps}/>
                            )
                        )}
                    />
                    <Route
                        path="/signup"
                        render={(routeProps) => (
                            this.props.loggedIn ? (
                                <Redirect to="/"/>
                            ) : (
                                <SignupPage {...routeProps}/>
                            )
                        )}
                    />
                    {/* <Route path="/account" component={} /> */}
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.user
    }
};

export default connect(mapStateToProps)(App);