import React, { Component } from 'react';
import DiskListItem from './DiskListItem';

import ListDisks from './ListDisks';

class Disks extends Component {

  constructor() {
    super();
    this.deleteDisk = this.deleteDisk.bind(this);
    this.state = {
      currentlyProcessing: false,
      collection: "Family",
      data: [],
      loading: false
    };
  }

  static defaultProps = {
    games: [
      { "title": "Default Title", "games": [ "Default Game" ], "blocksFree": 0 }
    ]
  };


  componentDidMount() {
    this.setState({loading: true});
    // fetch data here when we have it fetchable
    const url = './disks.json';
    this.setState({ "loading": true });
    fetch(url)
      .then(response => response.json())
      .then(result => {
        const disks = result.disks.map(disk => {
          return disk;
        });
        this.setState({ data: disks, loading: false });
      });


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

  deleteDisk(which) {
    let tmpDisks = this.state.data;
    tmpDisks = tmpDisks.filter(function(value, index, arr) {
      return value !== which;
    });
    console.log(tmpDisks);

    this.setState({ data: tmpDisks });
  };

  render() {
    const games = this.state.data;

    return (
      <div>
        <h1>Disks are { this.state.currentlyProcessing ? '' : 'NOT '}being processed at the moment</h1>
        <h2>First Way of Displaying Disks</h2>
        <ul style={{color: this.props.color }}>
          { games.map((game,i) => <DiskListItem key={i} info={game} collection={this.state.collection} />) }
        </ul>
        <button onClick={this.toggleProcessing}>{ this.state.currentlyProcessing ? 'Stop ' : 'Start ' }Processing</button>
        <h2>Second Way of Handling Disks</h2>
        <ListDisks disks={this.state.data} collection={this.state.collection} deleteDisk={this.deleteDisk}/>
      </div>
    );

  }
}

export default Disks;
