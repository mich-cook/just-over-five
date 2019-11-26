import React, { Component } from 'react';

class Disk extends Component {

  render() {

    return (
      <div className="disk">
        <p>{this.props.game}</p>
      </div>
    );
  }
}

export default Disk;
