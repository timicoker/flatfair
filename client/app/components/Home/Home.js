import React, { Component } from 'react';
import 'whatwg-fetch';
import {getFromStorage} from '../App/Util/storage'
import {SignInForm, SignUpForm} from '../Pages/SignInForm'
import '../../styles/App.css'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      isLoading: true,
      signUpError: '',
      signInError: ''
    };

    
  }

  componentDidMount() {
    const obj = (getFromStorage('login'));
    if (obj && obj.token){
      const { token } = obj;
      fetch('/api/account/verify?token=' + token)
      .then(res => res.json())
      .then(json => {
        if(json.success){
          this.setState({
            token,
            isLoading: false,

          });
        }else{
          this.setState({
          isLoading: false
        });
      }
    });

    }else{
      this.setState({
        isLoading: false,
      })
    }
  }

  /* newCounter() {
    fetch('/api/counters', { method: 'POST' })
      .then(res => res.json())
      .then(json => {
        let data = this.state.counters;
        data.push(json);

        this.setState({
          counters: data
        });
      });
  }

  incrementCounter(index) {
    const id = this.state.counters[index]._id;

    fetch(`/api/counters/${id}/increment`, { method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        this._modifyCounter(index, json);
      });
  }

  decrementCounter(index) {
    const id = this.state.counters[index]._id;

    fetch(`/api/counters/${id}/decrement`, { method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        this._modifyCounter(index, json);
      });
  }

  deleteCounter(index) {
    const id = this.state.counters[index]._id;

    fetch(`/api/counters/${id}`, { method: 'DELETE' })
      .then(_ => {
        this._modifyCounter(index, null);
      });
  }

  _modifyCounter(index, data) {
    let prevData = this.state.counters;

    if (data) {
      prevData[index] = data;
    } else {
      prevData.splice(index, 1);
    }

    this.setState({
      counters: prevData
    });
  } */

  render() {
    const { 
      isLoading,
     } = this.state;
    if(isLoading) {
      return (<div><p>Loading...</p></div>);
    }
    if(!token) {
      return(
        <div>
          < SignInForm />
          < SignUpForm />
        </div>
      )
    }

    // if your token is verified go straight to account
    return (
      <div>
        <p>Successful Login</p>
      </div>
    );
  }
}

export default Home;
