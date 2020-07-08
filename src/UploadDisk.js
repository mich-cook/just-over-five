import React, { Component } from 'react';

export default class UploadDisk extends Component {

  constructor() {
    super();
    this.uploadHandler = this.uploadHandler.bind(this);
	  this.state = {
  	  "error": ""
	  }
  }

  async uploadHandler(e) {
    e.preventDefault();   // don't form submit and navigate
    let disk = document.getElementById("diskupload").files[0];   // for now just one file. maybe multiple in the future.

    let formData = new FormData();
    formData.append("disk", disk);
//    formData.append("title", JSON.stringify(title));  // do we want this? maybe not.

		// placeholder endpoint until the real one is done. plenty of error testing for now. :)
    let result = await fetch("/api/disks", { "method": "POST", "body": formData });

		// more robust error handling once we have an actual API up and running (later today?)
    if (result.status !== 200) {
      this.setState({ "error": "Problem uploading. Better error messaging forthcoming." });
    }

		// what to do on success? clear for new upload? close the overlay?
  }

  closeHandler = () => {
    document.querySelector("#addDiskForm form").reset();
    this.setState({ "error": ""});
    this.props.handleClose();
  }

  render() {
    let display = this.props.show ? "flex" : "none";
    return (
      <div id="addDiskForm" className="overlay" style={{display: display }}>
        <div className="overlay-content">
          <button aria-label="Close disk upload overlay" className="close-overlay" onClick={this.closeHandler}>×</button>
      	  <form onSubmit={this.uploadHandler}>
    	      <label htmlFor="diskupload">Upload A Disk To Your Collection</label>
  	        <input type="file" id="diskupload" name="disk" accept=".d64" required />
            <p className="error">{this.state.error}</p>
            <button type="submit">Upload</button>
	        </form>
        </div>
      </div>
    );
  }
}
