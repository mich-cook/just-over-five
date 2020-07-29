import React, { Component } from 'react';

export default class UploadDisk extends Component {

  constructor() {
    super();
    this.uploadHandler = this.uploadHandler.bind(this);
    this.catchEscape = this.catchEscape.bind(this);
	  this.state = {
  	  "error": ""
	  }
  }

  // power users expect to be able to close modal with escape key
  catchEscape(event) {
    if (event.keyCode === 27) {
      this.closeHandler();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.catchEscape);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.catchEscape);
  }

  async uploadHandler(e) {
    e.preventDefault();   // don't form submit and navigate
    this.setState({ "error": "" });
    let disk = document.getElementById("diskupload").files[0];   // for now just one file. maybe multiple in the future.

    let formData = new FormData();
    formData.append("disk", disk);
//    formData.append("title", JSON.stringify(title));  // do we want this? maybe not.

		// placeholder endpoint until the real one is done. plenty of error testing for now. :)
    let result = await fetch("//localhost:8000/api/v1/c64", { "method": "POST", "body": formData });

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
            <p className="ready">READY.</p>
            <p className="cursor">&nbsp;</p>
  	        <input type="file" id="diskupload" name="disk" accept=".d64" required />
            <p className="error">{this.state.error}</p>
            <button type="submit">Upload</button>
	        </form>
        </div>
      </div>
    );
  }
}
