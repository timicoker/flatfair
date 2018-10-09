import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'radio' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render() {
        return (
        <div className="formCenter">
            <form onSubmit={this.handleSubmit} className="formFields" onSubmit={this.handleSubmit}>
            <div className="formField">
                <label className="formFieldLabel" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="formFieldInput" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>

              <div className="formField">
                <label className="formFieldLabel" htmlFor="password">Password</label>
                <input type="password" id="password" className="formFieldInput" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>

              <div className="formField">
                  <button className="formFieldButton marginRight">Sign In</button> 
              </div>
            </form>
          </div>
        );
    }
}

export default SignInForm;
