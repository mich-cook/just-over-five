import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';

import firebase from './Firebase.js';

import Login from './Login.js';
import MyDisks from './Disks.js';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      "user": null,
      "displayName": null,
      "uid": null,
      "userPhoto": null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          "user": user,
          "displayName": user.displayName,
          "uid": user.uid,
          "userPhoto": user.photoURL
        });
        navigate('/my');
      } else {
        this.setState({
          "user": null,
          "displayName": null,
          "uid": null,
          "userPhoto": null
        });
      }
    });
  }

  render() {
    return (
      <Router>
        <Login path="/login" />
        <MyDisks path="/" />
        <MyDisks path="/my" uid={this.state.uid} name={this.state.displayName} photoURL={this.state.userPhoto} />
      </Router>
    );
  }
}
