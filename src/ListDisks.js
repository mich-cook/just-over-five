import React, {Component} from 'react';

class ListDisks extends Component {

  constructor(props) {
    super(props);

    this.state = {
      disks: []
    };
  }

  componentDidMount() {
    fetch(`//localhost:8000/api/v1/c64/user/${this.props.user}`)
      .then(response => response.json())
      .then(data => {
        if (data !== null) {
          this.setState({ "disks": data.disks });
        }  // else leave state.disks as []
      });
  }

  render() {
    return (
      <ul>
        {this.state.disks.map(item => (
          <li key={item._id} onClick={e => this.props.showListing(item._id)}>
            <span className="title">{item.name}</span> | 
            <span className="blocks-free"> {item.free}</span>
          </li>
        ))}
      </ul>
    );
  }
};

export default ListDisks;
