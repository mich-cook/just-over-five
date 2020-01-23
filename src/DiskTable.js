import React, {Component} from 'react';

class DiskTable extends Component {

  displayName: 'DiskTable';

  // TODO: propTypes
  // TODO: defaults

/*
  propTypes: {
    "title": React.PropTypes.string.isRequired,
    "blocksFree": React.PropTypes.number.isRequired,
    "collection": React.PropTypes.string,
    this.props.disks: React.PropTypes.arrayOf(
      React.PropTypes.ObjectOf(    // wrong, but documenting nonetheless
        React.PropTypes.string.isRequired // title
        React.PropTypes.number.isRequired // blocks free
        React.PropTypes.string // collection
      )
    )
  };

  defaultProps() {
    return {
      "title": `No title provided`,
      "blocksFree": 664,
      "collection": `Unspecified collection`
    };
  };
*/

  render() {

    // TODO: allow each one to have a default instead of anything-matches object
    // title = `No title provided`
    // programs = [ `No programs provided`]
    // blocksFree = 664
    // collection = `Unspecified collection`

    return (
      <table style={{paddingTop: "30px", paddingBottom: "30px"}}>
        <thead onClick={ e => this.props.sortDisks(e.target.id) }>
          <tr><th id="title">Title</th><th id="blocksFree">Blocks Free</th><th id="collection">Collection</th></tr>
        </thead>
        <tbody>
        {this.props.disks.map((item,i) => (
          <tr key={i}>
            <td className="title">{item.title}</td>
            <td className="blocks-free">{item.blocksFree}</td>
            <td className="collection">Family</td>
            <td><button onClick={(e) => this.props.deleteDisk(item)}>Delete Disk</button></td>
          </tr>

        ))}
        </tbody>
      </table>
    );
  }
};

export default DiskTable;
