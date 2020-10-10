import React, { Component } from 'react';

import firebase, { provider } from './Firebase.js';

export default class Login extends Component {

  // if the user is already logged in, bounce to /my

  constructor() {
    super();
    this.state = {
      "errorDisplay": "none"
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    firebase.auth().signInWithPopup(provider).then(result => {
//
// result.user stuff that's useful:
// result.user.displayName
// result.user.uid
// result.user.photoURL
//
      this.setState({ "errorDisplay": "none" });
    }).catch(error => {
      this.setState({ "errorDisplay": "block" });
//
// error stuff that might be useful:
// error.code
// error.message
// error.email
// error.credential
//
    });
  }

  render() {
    return (
      <div id="login-page">
        <section>
          <p>Log in to manage your account:</p>
          <ul>
            <li>Upload disks</li>
            <li>Review disks</li>
            <li>Remove disks</li>
          </ul>
          <p>Planned Features:</p>
          <ul>
            <li>Disk remix</li>
            <li>Community</li>
          </ul>
        </section>
        <section id="login-form">
          <h1>Welcome to Just Over Five. Please log in to continue.</h1>
          <button onClick={this.onClick}>Log in with Google</button>
          <p style={{ "display": this.state.errorDisplay }}>Error logging in via Google. Please try again.</p>
        </section>
      </div>
    );
  }
}
