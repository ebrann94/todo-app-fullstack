import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../store/user-actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {
                email: '',
                password: ''
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => ({
            fields: {
                ...prevState.fields,
                [name]: value
            }
        }));
    }

    handleSubmit(e) {
        e.preventDefault();
        const userInfo = this.state.fields;
        const keys = Object.keys(userInfo);
        const isFormFull = keys.every(key => !!userInfo[key]);

        if (!isFormFull) {
            this.setState({error: 'Please fill out all fields!'});
        } else {
            this.props.dispatch(startLogin(userInfo));
            e.target.reset();
        }

    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-card">
                    <h1 className="login__heading">Log In</h1>
                    <form
                        className="login-form"
                        onSubmit={this.handleSubmit}
                    >
                        <div className="login__email-input login__input">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="login__password-input login__input">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <input type="submit" value="Login" className="login__submit"/>
                    </form>
                    <div className="login__error">
                        <p>{this.state.error}</p>
                        <p>{this.props.loginError}</p>
                    </div>
                    <div className="login__signup-link">
                        <p>Don't have an account? </p>
                        <Link to="/signup">Signup</Link>
                    </div>
                </div>
            </div>
    
        );
    }
};

const mapStateToProps = (state) => {
    return {
        ...state.user
    }
};

export default connect(mapStateToProps)(LoginPage);