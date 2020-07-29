import React, { Component } from 'react';
// import DiskListItem from './DiskListItem';
// import DiskTable from './DiskTable';
// import SearchDisks from './SearchDisks';

import ListDisks from './ListDisks';
import UploadDisk from './UploadDisk';
import DiskListing from './DiskListing';

class Disks extends Component {

  constructor() {
    super();
    this.showListing = this.showListing.bind(this);
    this.state = {
      loading: false,  // use this later

      showUploadOverlay: false,
      showDiskListingOverlay: false,
      listingData: { "files": [], "title": "" },
    };
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

    return (
      <div>
        <p style={{ "textAlign": "center" }}>**** My d64 Floppy Disk Catalog ****</p>
        <ListDisks user="fake-id-until-user-system-implemented" showListing={this.showListing} /> {/*disks={sortedDisks} collection={this.state.collection} /> */}
{/*        <DiskTable disks={sortedDisks} sortDisks={this.sortDisks} collection={this.state.collection} />  */}
{/*        <SearchDisks orderBy={this.state.orderBy} orderAsc={this.state.orderAsc} changeOrder={this.changeOrder} searchDisks={this.searchDisks} />  */}
        <button onClick={this.showUploadOverlay}>Upload Disk</button>
        <UploadDisk show={this.state.showUploadOverlay} handleClose={this.hideUploadOverlay} />
        <DiskListing show={this.state.showDiskListingOverlay} listing={this.state.listingData} handleClose={this.hideListing} />
      </div>
    );

  }
}

export default Disks;
