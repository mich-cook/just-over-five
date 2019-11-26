import React, {Component} from 'react';

class ListDisks extends Component {
  render() {

    // allow each one to have a default instead of anything-matches object
    // const { title = "No title provided", games = [ "No games provided"], blocksFree = 664 } = this.props.info;
    const { collection = "Unspecified" } = this.props

    return (
      <ul>
        {this.props.disks.map((item,i) => (
          <li key={i}>
            {item.title} | {item.games[0]} | {item.blocksFree} blocks free ({collection} collection)
            <button onClick={(e) => this.props.deleteDisk(item)}>Delete Disk</button>
          </li>
        ))}
      </ul>
    );
  }
};

export default ListDisks;
