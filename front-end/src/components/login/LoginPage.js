import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../store/user-actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const userInfo = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.dispatch(startLogin(userInfo));
        e.target.reset();
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        return (
            <div className="login-container">
                <h1>Log In</h1>
                <form 
                    className="login-form"
                    onSubmit={this.handleSubmit}
                >
                    <div className="login__email-input login__input">
                        <label htmlFor="email">Email: </label>
                        <input 
                            type="text" 
                            name="email" 
                            required
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="login__password-input login__input">
                        <label htmlFor="password">Password: </label>
                        <input 
                            type="password" 
                            name="password" 
                            required 
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <input type="submit" value="Login" className="login__submit"/>
                </form>
                <p>{this.props.loginError}</p>
                <div className="signup-link">
                    <p>Don't have an account? </p>
                    <Link to="/signup">Signup</Link>
                </div>
            </div>
    
        );
    }
};

const mapStateToProps = (state) => {
    return {
        ...state.user
    }
}

export default connect(mapStateToProps)(LoginPage);