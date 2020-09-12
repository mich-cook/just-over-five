import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';

import Login from './Login.js';
import MyDisks from './Disks.js';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Login path="/login" />
        <MyDisks path="/" />
      </Router>
    );
  }
}
