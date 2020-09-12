import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';

import MyDisks from './Disks.js';

export default class App extends Component {
  render() {
    return (
      <Router>
        <MyDisks path="/" />
      </Router>
    );
  }
}
