import React, { Component } from 'react';
// import DiskListItem from './DiskListItem';

import ListDisks from './ListDisks';
// import DiskTable from './DiskTable';
// import SearchDisks from './SearchDisks';
import UploadDisk from './UploadDisk';
import DiskListing from './DiskListing';

class Disks extends Component {

  constructor() {
    super();
    this.sortDisks = this.sortDisks.bind(this);
    this.deleteDisk = this.deleteDisk.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchDisks = this.searchDisks.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.showListing = this.showListing.bind(this);
    this.state = {
      currentlyProcessing: false,
      collection: "Family",
      data: [],
      loading: false,

      showUploadOverlay: false,
      showDiskListingOverlay: false,
      listingData: { "files": [], "title": "" },

/* sorting */
      orderBy: 'title',
      orderAsc: true,  // instead of tracking ascending/descending, we can toggle a Boolean ascending flag

/* filtering */
      keyword: ''
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

// another option:
// toggleAddDiskFormDisplay() { this.setState({ showAddDiskform: !this.state.showAddDiskForm }); }

  sortDisks(by, asc) {
    if (by === this.state.orderBy) {
        // clicked on the currently sorted column
        // so reverse the sort order
        this.setState(prevState => ({ orderAsc: !prevState.orderAsc }));
    } else {
        // first time clicking on this sort field
        // default to ascending
        this.setState({ orderBy: by, orderAsc: true });
    }
  };


//  changeOrder(by, dir) {
  changeOrder(e) {
    const target = e.target;
    const value = target.value;

// TODO: handle order dir changes

    this.setState({
      orderBy: value
    });
  }

  searchDisks(value) {
    this.setState({ keyword: value });
  }

  updateInfo(name, value, id) {
    let tmpDisks = this.state.data;

// TODO: Finish this.

//    let index = index using id
// find the thing to update and update it
//    tmpDisks[index][name] = value;
    this.setState({ data: tmpDisks});
  }

  showUploadOverlay = () => {
    this.setState({ showUploadOverlay: true });
  }

  hideUploadOverlay = () => {
    this.setState({ showUploadOverlay: false });
  }

  showListing = (which) => {
    fetch(`//localhost:8000/api/v1/c64/disk/${which}`)
      .then(response => response.json())
      .then(data => {
        if (data !== null) {
          this.setState({ "showDiskListingOverlay": true, "listingData": data });
        }  // else leave these state fields alone
      });

  }

  hideListing = () => {
    this.setState({ "showDiskListingOverlay": false });
  }



  render() {
    // const games = this.state.data;

/*
    let order = 1; // ascending by default
    if (this.state.orderAsc === false) {
      order = -1;
    }

    let sortedDisks = this.state.data; // games;
    sortedDisks = sortedDisks.sort((a,b) => {
      if(a[this.state.orderBy] < b[this.state.orderBy]) {
        return -1 * order;
      } else {
        return 1 * order;
      }
    }).filter(disk => {
      return (
// TODO: handle searching games arrays
// TODO: decide and handle matching blocks free
        disk['title'].toLowerCase()
        .includes(this.state.keyword.toLowerCase()) ** || 
        disk['game'].toLowerCase()
        .includes(this.state.keyword.toLowerCase()) || 
        disk['blocksFree'].toLowerCase
        .includes(this.state.keyword.toLowerCase()) || **
      );
    });  */

    return (
      <div>
        <p style={{ "textAlign": "center" }}>**** My d64 Floppy Disk Catalog ****</p>
{/*        <h1>Disks are { this.state.currentlyProcessing ? '' : 'NOT '}being processed at the moment</h1> */}
{/*        <h2>First Way of Displaying Disks</h2>
        <ul style={{color: this.props.color }}>
          { games.map((game,i) => <DiskListItem key={i} info={game} collection={this.state.collection} />) }
        </ul>*/}
{/*        <button onClick={this.toggleProcessing}>{ this.state.currentlyProcessing ? 'Stop ' : 'Start ' }Processing</button> */}
{/*        <h2>Second Way of Handling Disks</h2> */}
        <ListDisks user="fake-id-until-user-system-implemented" showListing={this.showListing} /> {/*disks={sortedDisks} collection={this.state.collection} deleteDisk={this.deleteDisk} updateInfo={this.updateInfo} /> */}
{/*        <DiskTable disks={sortedDisks} sortDisks={this.sortDisks} collection={this.state.collection} deleteDisk={this.deleteDisk} updateInfo={this.updateInfo} />  */}
{/*        <SearchDisks orderBy={this.state.orderBy} orderAsc={this.state.orderAsc} changeOrder={this.changeOrder} searchDisks={this.searchDisks} />  */}
        <button onClick={this.showUploadOverlay}>Upload Disk</button>
        <UploadDisk show={this.state.showUploadOverlay} handleClose={this.hideUploadOverlay} />
        <DiskListing show={this.state.showDiskListingOverlay} listing={this.state.listingData} handleClose={this.hideListing} />
      </div>
    );

  }
}

export default Disks;
