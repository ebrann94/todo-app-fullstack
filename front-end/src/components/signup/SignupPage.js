import React from 'react';
import { connect } from 'react-redux';
import { startSignup } from '../../store/user-actions';
import { withRouter } from 'react-router';

class SignupPage extends React.Component {
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

        if (this.state.password.length < 7 ) {
            this.setState({error: "Password must be 7 characters or more"})
        } else {
            const userInfo = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }
            this.props.dispatch(startSignup(userInfo));
        }
    } 

    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        return (
            <div className="login-container">
                <h1>Sign Up</h1>
                <form 
                    className="login-form"
                    onSubmit={this.handleSubmit}
                >
                    <div className="login__input">
                        <label htmlFor="firstName">First Name:</label>
                        <input 
                            type="text" 
                            name="firstName"
                            onChange={this.handleInputChange}
                        />
                        
                    </div>
                    <div className="login__input">
                        <label htmlFor="lastName">Last Name:</label>
                        <input 
                            type="text" 
                            name="lastName" 
                            onChange={this.handleInputChange}
                        />
                        
                    </div>
                    <div className="login__input">
                        <label htmlFor="email">Email: </label>
                        <input  
                            type="text" 
                            name="email" 
                            onChange={this.handleInputChange}
                        />
                        
                    </div>
                    <div className="login__input">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password"
                            name="password" 
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <input type="submit" value="Sign Up" className="login__submit"/>
                </form>
            </div>
        )
    }
}

export default withRouter(connect()(SignupPage));