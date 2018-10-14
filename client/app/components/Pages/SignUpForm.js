import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
            signUpLastName: '',
            signUpUserType:''
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
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ 
            signUpEmail: event.target.value,
            signUpPassword: event.target.value,
            signUpFirstName: event.target.value,
            signUpLastName: event.target.value,
            signUpLastName: event.target.value,
            signUpUserType: event.target.value,
        });
        console.log('The form was submitted with the following data:');
        console.log(this.state);
        // post to db

        fetch('/api/account/signup', { method: 'POST', headers:{'Content-Type': 'application/json'}, body: JSON.stringify({

            email: signUpEmail,
            password: signUpPassword, 
            fistName: signUpFirstName, 
            lastname: signUpLastName, 
            userType: signUpUserType
        }) 
        }).then(res => res.json())
        .then(json => {
            this.setState({
                isLoading: false,
                // if successful clewr all fields
                signUpEmail: '', 
                signUpFirstName: '',
                signUpPassword: '',
                signUpUserType: '', 
                signUpLastName: '',
            });
        }); 
    }



    render() {

        const {
            signUpEmail,
            signUpFirstName, 
            signUpLastName, 
            signUpPassword, 
            signUpUserType
        } = this.state

        return (
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="formFields">
              <div className="formField">
                <label className="formFieldLabel" htmlFor="fistName">Full Name</label>
                <input type="text" id="name" className="formFieldInput" placeholder="Enter your first name"  value={signUpFirstName} onChange={this.handleChange} />
              </div>
              <div className="formField">
                <label className="formFieldLabel" htmlFor="LastName">Full Name</label>
                <input type="text" id="name" className="formFieldInput" placeholder="Enter your last name"  value={signUpLastName} onChange={this.handleChange} />
              </div>
              <div className="formField">
                <label className="formFieldLabel" htmlFor="password">Password</label>
                <input type="password" id="password" className="formFieldInput" placeholder="Enter your password"  value={signUpPassword} onChange={this.handleChange} />
              </div>
              <div className="formField">
                <label className="formFieldLabel" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="formFieldInput" placeholder="Enter your email"  value={signUpEmail} onChange={this.handleChange} />
              </div>

              <div className="formField">
                <label className="radioLabel">
                    <input className="formFieldRadio" type="radio" name="user" checked={signUpUserType} onChange={this.handleChange} />
                    Agent 
                </label>

                <label className="radioLabel">
                    <input className="formFieldRadio" type="radio" name="user" checked={signUpUserType} onChange={this.handleChange} /> 
                    Tenant
                </label>
                <label className="radioLabel">
                    <input className="formFieldRadio" type="radio" name="user" checked={signUpUserType} onChange={this.handleChange} />
                    Landlord 
                </label>
              </div>

              <div className="formField">
                  <button className="formFieldButton marginRight">Sign Up</button> 
                  <Link to="/sign-in" className="formFieldLink">I'm already member</Link>
              </div>
            </form>
          </div>
        );
    }
}

export default SignUpForm;
