import React, { Component } from 'react';
import DiskListItem from './DiskListItem';

import ListDisks from './ListDisks';
import AddDisk from './AddDisk';
import SearchDisks from './SearchDisks';

class Disks extends Component {

  constructor() {
    super();
    this.deleteDisk = this.deleteDisk.bind(this);
    this.showAddDiskForm = this.showAddDiskForm.bind(this);
    this.hideAddDiskForm = this.hideAddDiskForm.bind(this);
    this.addDisk = this.addDisk.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.state = {
      currentlyProcessing: false,
      collection: "Family",
      data: [],
      loading: false,
      showAddDiskForm: false,

/* sorting */
      orderBy: 'title',
      orderDir: 'asc'
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

  showAddDiskForm() {
    this.setState({ showAddDiskForm: true });
  }

  hideAddDiskForm() {
    this.setState({ showAddDiskForm: false });
  }
// another option:
// toggleAddDiskFormDisplay() { this.setState({ showAddDiskform: !this.state.showAddDiskForm }); }

  addDisk(disk) {
    let tmpDisks = this.state.data;
    tmpDisks.push(disk);
    this.setState({ data: tmpDisks });
  }

//  changeOrder(by, dir) {
  changeOrder(e) {
    const target = e.target;
    const value = target.value;

// TODO: handle order dir changes

    this.setState({
      orderBy: value
    });
  }

  render() {
    const games = this.state.data;

    let order = 1; // ascending by default
    let sortedDisks = this.state.data; // games;
    if (this.state.orderDir !== 'asc') {
      order = -1;
    }

    sortedDisks.sort((a,b) => {
      if(a[this.state.orderBy] < b[this.state.orderBy]) {
        return -1 * order;
      } else {
        return 1 * order;
      }
    });

    return (
      <div>
        <h1>Disks are { this.state.currentlyProcessing ? '' : 'NOT '}being processed at the moment</h1>
        <h2>First Way of Displaying Disks</h2>
        <ul style={{color: this.props.color }}>
          { games.map((game,i) => <DiskListItem key={i} info={game} collection={this.state.collection} />) }
        </ul>
        <button onClick={this.toggleProcessing}>{ this.state.currentlyProcessing ? 'Stop ' : 'Start ' }Processing</button>
        <h2>Second Way of Handling Disks</h2>
        <ListDisks disks={sortedDisks} collection={this.state.collection} deleteDisk={this.deleteDisk}/>
        <button onClick={this.showAddDiskForm}>New Way Add Disk</button>
        <AddDisk showAddDiskForm={this.state.showAddDiskForm} hideAddDiskForm={this.hideAddDiskForm} addDisk={this.addDisk} />
        <SearchDisks orderBy={this.state.orderBy} orderDir={this.state.orderDir} changeOrder={this.changeOrder} />
      </div>
    );

  }
}

export default Disks;
