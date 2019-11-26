import React, { Component } from 'react';

class AddDiskForm extends Component {

  state = {
    title: '',
    game: '',
    blocksFree: 0
  };

  newTitle = e =>
    this.setState({ value: e.target.value});

  submit = e => {
    console.log(`Title to add: ${this.state.value}`);
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.submit}>
        <label>Disk Title:
          <input type="text" name="title" onChange={this.newTitle} />
        </label>
        <label>Disk Game:
          <input type="text" name="game" />
        </label>
        <label>Blocks Free on Disk:
          <input type="number" name="blocksfree" min="0" max="664" step="1" />
        </label>
        <button>Add Disk</button>
      </form>
    );
  }
}

export default AddDiskForm;
