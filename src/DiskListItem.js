import React, { Component } from 'react';

class DiskListItem extends Component {

  render() {
	// allow each one to have a default instead of anything-matches object
    const { title = "No title provided", programs = [ "No programs provided"], blocksFree = 664 } = this.props.info;
    const { collection = "Unspecified" } = this.props

    return (
        <li>{title} | {programs[0]} | {blocksFree} blocks free ({collection} collection)</li>
    );
  }
}

export default DiskListItem;
