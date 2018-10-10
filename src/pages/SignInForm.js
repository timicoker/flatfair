import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            isValidated: false
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


    validate = () => {
        

        if (this.flatFair.checkValidity() === false) {
            return false;
            // return false if login data is invalid
        } else {
            return true;
            //return true if login is valid
        }
    }


    handleSubmit = (event) => {
        event.preventDefault();

        if (this.validate()) {
        // if valid set state to isValidated
        this.setState({isValidated: true});
        console.log('The form was submitted with the following data:');
        console.log(this.state);
        }
    }

    render() {
        return (
        <div className="formCenter">
            <form ref={form => this.flatFair = form} onSubmit={this.handleSubmit} {...this.props} noValidate>
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
                  <Link to="/" className="formFieldLink">I need to create an account</Link> 
              </div>
            </form>
          </div>
        );
    }
}

export default SignInForm;
