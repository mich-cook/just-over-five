import React, {Component} from 'react';

class ListDisks extends Component {

  constructor(props) {
    super(props);

    this.state = {
      "uid": null,
      "disks": []
    };
  }

  fetchUserDiskInfo() {
    // if we don't have a user, don't bother doing the fetch
    if (this.props.user === null)  return;

    // break the loop caused by updating the data
    // then the update causing componentDidUpdate() to run
    // which then updates the data which then ...
    if (this.props.user === this.state.uid) return;

    fetch(`//localhost:8000/api/v1/c64/user/${this.props.user}`)
      .then(response => response.json())
      .then(data => {
        let state = { "uid": this.props.user };
        if (data !== null)  state.disks = data.disks;
        this.setState(state);
      });
  }

  componentDidMount() {
    // firebase usually hasn't figured this out on load
    // when the component is mounted, but try just in case
    this.fetchUserDiskInfo();
  }

  componentDidUpdate() {
    // typically we find out that a user is logged in
    // after the component mounted.
    this.fetchUserDiskInfo();
  }

  render() {
    return (
      <ul>
        {this.state.disks.map(item => (
          <li key={item._id} onClick={e => this.props.showListing(item._id)}>
            <span className="title">{item.title}</span> |
            <span className="blocks-free"> {item.free}</span>
          </li>
        ))}
      </ul>
    );
  }
};

export default ListDisks;
