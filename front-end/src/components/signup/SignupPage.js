import React from 'react';
import { connect } from 'react-redux';
import { startSignup } from '../../store/user-actions';
import { withRouter } from 'react-router';

class SignupPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            error: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkPasswordLength = this.checkPasswordLength.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            fields: {
                [name]: value
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const fields = this.state.fields;

        const keys = Object.keys(fields); 
        const isFormFull= keys.every(key => fields[key]);

        if (fields.password.length < 7) {
            this.setState({error: 'Password must be 7 characters or more'});
        } else if (!isFormFull) {
            this.setState({error: 'Please fill in all fields'});
        } else {
            this.props.dispatch(startSignup(fields));
        }
    } 

    checkPasswordLength() {
        if (this.state.password.length < 7) {
            this.setState({error: 'Password must be 7 characters or more'})
        } else {
            this.setState({error: ''});
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
                            value={this.state.firstName}
                            onChange={this.handleInputChange}
                        />
                        
                    </div>
                    <div className="login__input">
                        <label htmlFor="lastName">Last Name:</label>
                        <input 
                            type="text" 
                            name="lastName" 
                            value={this.state.lastName}
                            onChange={this.handleInputChange}
                        />
                        
                    </div>
                    <div className="login__input">
                        <label htmlFor="email">Email: </label>
                        <input  
                            type="text" 
                            name="email" 
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                        
                    </div>
                    <div className="login__input">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password"
                            name="password" 
                            value={this.state.password}
                            onBlur={this.checkPasswordLength}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    {this.state.error && <p className="login-error">{this.state.error}</p>}
                    <input type="submit" value="Sign Up" className="login__submit"/>
                </form>
            </div>
        )
    }
}

export default withRouter(connect()(SignupPage));