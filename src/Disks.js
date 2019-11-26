import React, { Component } from 'react';
import DiskListItem from './DiskListItem';

class Disks extends Component {

  static defaultProps = {
    games: [
      { "title": "Default Title", "games": [ "Default Game" ], "blocksFree": 0 }
    ]
  };

  state = {
    currentlyProcessing: false,
    collection: "Family",
    data: [],
    loading: false
  };

  componentDidMount() {
    this.setState({loading: true});
    // fetch data here when we have it fetchable
    console.log("A Disks component mounted.");
  };

  componentDidUpdate() {
    console.log("A Disks component updated.");
  };

  toggleProcessing = () => {
    this.setState(prevState => ({
      currentlyProcessing: !prevState.currentlyProcessing
    }));
  };

  render() {
	const { games } = this.props; 

    return (
      <div>
        <h1>Disks are { this.state.currentlyProcessing ? '' : 'NOT '}being processed at the moment</h1>
        <ul style={{color: this.props.color }}>
          { games.map((game,i) => <DiskListItem key={i} info={game} collection={this.state.collection} />) }
        </ul>
        <button onClick={this.toggleProcessing}>{ this.state.currentlyProcessing ? 'Stop ' : 'Start ' }Processing</button>
      </div>
    );

  }
}

export default Disks;
