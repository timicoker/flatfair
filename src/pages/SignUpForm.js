import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            name: '',
            user:''
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
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="formFields">
              <div className="formField">
                <label className="formFieldLabel" htmlFor="name">Full Name</label>
                <input type="text" id="name" className="formFieldInput" placeholder="Enter your full name" name="name" value={this.state.name} onChange={this.handleChange} />
              </div>
              <div className="formField">
                <label className="formFieldLabel" htmlFor="password">Password</label>
                <input type="password" id="password" className="formFieldInput" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="formField">
                <label className="formFieldLabel" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="formFieldInput" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>

              <div className="formField">
                <label className="radioLabel">
                    <input className="formFieldRadio" type="radio" name="user" checked={this.state.agent} onChange={this.handleChange} />
                    Agent 
                </label>

                <label className="radioLabel">
                    <input className="formFieldRadio" type="radio" name="user" checked={this.state.tenant} onChange={this.handleChange} /> 
                    Tenant
                </label>
                <label className="radioLabel">
                    <input className="formFieldRadio" type="radio" name="user" checked={this.state.landlord} onChange={this.handleChange} />
                    Landlord 
                </label>
              </div>

              <div className="formField">
                  <button className="formFieldButton marginRight">Sign Up</button> 
              </div>
            </form>
          </div>
        );
    }
}

export default SignUpForm;
