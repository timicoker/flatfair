import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';
import './App.css';

class App extends Component {
      
  render() {
    return (
      <Router>
        <div className="App">
          

          <div className="appForm">
              <div className="formTitle">
                  <NavLink to="/sign-in" activeClassName="formTitleLink--Active" className="formTitleLink">Sign In</NavLink> or <NavLink exact to="/" activeClassName="formTitleLink--Active" className="formTitleLink">Sign Up</NavLink>
              </div>
              
                <Route exact path="/" component={SignUpForm}>
                </Route>
                <Route path="/sign-in" component={SignInForm}>
                </Route>
              
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
