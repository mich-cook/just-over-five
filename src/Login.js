import React, { Component } from 'react';

export default class Login extends Component {

  // if the user is already logged in, bounce to /my

  constructor() {
    super();
    this.state = {
      passwordDisplayed: false,
      passwordDisplayTitle: `Show Password`,
      passwordDisplayEmoji: `🐵`
    };

    this.togglePasswordDisplay = this.togglePasswordDisplay.bind(this);
  }

  togglePasswordDisplay() {
    if (this.state.passwordDisplayed === false) {

      document.getElementById("password").setAttribute("type", "input");

      this.setState({
        passwordDisplayTitle: `Hide Password`,
        passwordDisplayEmoji: `🙈`,
        passwordDisplayed: true
      });
    } else {

      document.getElementById("password").setAttribute("type", "password");

      this.setState({
        passwordDisplayTitle: `Show Password`,
        passwordDisplayEmoji: `🐵`,
        passwordDisplayed: false
      });
    }
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
          <div className="input-group">
            <input type="text" placeholder="Handle" id="username" />
            <i>👤</i>
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" id="password" />
            <i>🔒</i>
            <button title={this.state.passwordDisplayTitle} type="button" id="passwordDisplayToggle" onClick={this.togglePasswordDisplay}>{this.state.passwordDisplayEmoji}</button>
          </div>
          <button>Login</button>
        </section>
      </div>
    );
  }
}
