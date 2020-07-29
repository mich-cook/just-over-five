import React, { Component } from 'react';
// import DiskListItem from './DiskListItem';
// import DiskTable from './DiskTable';
// import SearchDisks from './SearchDisks';

import ListDisks from './ListDisks';
import UploadDisk from './UploadDisk';
import DiskListing from './DiskListing';

export default class Disks extends Component {

  constructor() {
    super();
    this.showListing = this.showListing.bind(this);
    this.state = {
      loading: false,  // use this later

      showOverlayUpload: false,
      showOverlayDiskListing: false,
      listingData: { "files": [], "title": "" },
    };
  }

  showOverlayUpload = () => {
    this.setState({ showOverlayUpload: true });
  }

  hideOverlayUpload = () => {
    this.setState({ showOverlayUpload: false });
  }

  showListing = (which) => {
    fetch(`//localhost:8000/api/v1/c64/disk/${which}`)
      .then(response => response.json())
      .then(data => {
        if (data !== null) {
          this.setState({ "showOverlayDiskListing": true, "listingData": data });
        }  // else leave these state fields alone
      });

  }

  hideListing = () => {
    this.setState({ "showOverlayDiskListing": false });
  }

  render() {
    return (
      <div>
        <p style={{ "textAlign": "center" }}>**** My d64 Floppy Disk Catalog ****</p>
        <ListDisks user="fake-id-until-user-system-implemented" showListing={this.showListing} /> {/*disks={sortedDisks} collection={this.state.collection} /> */}
{/*        <DiskTable disks={sortedDisks} sortDisks={this.sortDisks} collection={this.state.collection} />  */}
{/*        <SearchDisks orderBy={this.state.orderBy} orderAsc={this.state.orderAsc} changeOrder={this.changeOrder} searchDisks={this.searchDisks} />  */}
        <button onClick={this.showOverlayUpload}>Upload Disk</button>
        <UploadDisk show={this.state.showOverlayUpload} handleClose={this.hideOverlayUpload} />
        <DiskListing show={this.state.showOverlayDiskListing} listing={this.state.listingData} handleClose={this.hideListing} />
      </div>
    );
  }
}
