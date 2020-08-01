import React, { Component } from 'react';

export default class DiskListing extends Component {

  constructor(props) {
    super(props);
    this.catchEscape = this.catchEscape.bind(this);
  }

  // handler to close the modal
  closeHandler = () => {
    this.props.handleClose();
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

  render() {
    const display = this.props.show ? "flex" : "none";  // showing the modal or not?
    const name = this.props.listing.title.padEnd(16, ' ');  // name of the whole disk
    const id = this.props.listing.id;
    const dostype = this.props.listing.dosType;

    return (
      <div id="diskListing" className="overlay" style={{display: display }}>
        <div className="overlay-content">
          <button aria-label="Close disk listing overlay" className="close-overlay" onClick={this.closeHandler}>×</button>
          <div className="listing-header"><pre><span>0 </span>"{name}" {id} {dostype}</pre></div>
          <div className="listing-body">
            <ul>
            {this.props.listing.files.map((file, i) => {
              const size = file.size.toString().padEnd(5, ' ');
              const filename = `"${file.name}"`.padEnd(18, ' ');
              const type = file.type.padStart(4, ' ');
              return <li key={i}><pre>{size}{filename}{type}</pre></li>
            })}
            </ul>
            <p>{this.props.listing.free} blocks free.</p>
            <p className="ready">READY.</p>
            <p className="cursor">&nbsp;</p>
          </div>
        </div>
      </div>
    );
  }

}
