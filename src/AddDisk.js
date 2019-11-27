import React, {Component} from 'react';

class AddDisk extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      game: '',
      blocksFree: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);

  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  submit(e) {
    e.preventDefault();

    // TODO: validate the data

    let tmpDisk = {
      title: this.state.title,
      games: [ this.state.game ],
      blocksFree: parseInt(this.state.blocksFree, 10)
    };

    this.props.addDisk(tmpDisk);

    this.setState({
      title: '',
      game: '',
      blocksFree: 0
    });

    // this.props.hideAddDiskForm();

  }

  render() {
    return (
      <form onSubmit={this.submit} className={'modal ' + (this.props.showAddDiskForm ? '' : 'hidden')}>
        <button type="button" onClick={(e) => this.props.hideAddDiskForm()}>Close Form</button>
        <h2>New Add Disk Form Component</h2>
        <label>Disk Title:
          <input type="text" name="title" placeholder="Title of Disk" value={this.state.title} onChange={this.handleChange} />
        </label> 
        <label>Disk Game:
          <input type="text" name="game" placeholder="Game on disk" value={this.state.game} onChange={this.handleChange} />
        </label> 
        <label>Blocks Free on Disk:
          <input type="number" name="blocksFree" min="0" max="664" step="1" value={this.state.blocksFree} onChange={this.handleChange} />
        </label> 
        <button>Add Disk</button>
      </form>

    );
  }
};

export default AddDisk;
