import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { setInStorage} from '../App/Util/storage'
class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            signInEmail: '',
            signInPassword: '',

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


   


    onSignIn = (event) => {
        event.preventDefault();
        this.setState({ 
            signInEmail: event.target.value,
            signInPassword: event.target.value,
        });
        console.log('The form was submitted with the following data:');
        console.log(this.state);
        // post to db

        fetch('/api/account/signin', { method: 'POST', headers:{'Content-Type': 'application/json'}, body: JSON.stringify({

            email: signInEmail,
            password: signInPassword 
            
        }) 
        }).then(res => res.json())
        .then(json => {
            setInStorage('login', {token: json.token})
            this.setState({
                isLoading: false,
                // if successful clewr all fields
                signInEmail: '', 
                signUpPassword: '',
                token: json.token
            });
        }); 
    }

    render() {
        const {
            signInEmail, 
            signInPassword
        } = this.state

        return (
        <div className="formCenter">
            <form ref={form => this.flatFair = form} onSubmit={this.onSignIn} {...this.props} noValidate>
            <div className="formField">
                <label className="formFieldLabel" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="formFieldInput" placeholder="Enter your email"  value={signInEmail} onChange={this.handleChange} />
              </div>

              <div className="formField">
                <label className="formFieldLabel" htmlFor="password">Password</label>
                <input type="password" id="password" className="formFieldInput" placeholder="Enter your password"  value={signInPassword} onChange={this.handleChange} />
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
