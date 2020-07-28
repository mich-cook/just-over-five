import React, {Component} from 'react';

class ListDisks extends Component {

  constructor(props) {
    super(props);

    this.state = {
      disks: []
    };
  }

  componentDidMount() {
    fetch(`//localhost:8000/api/v1/c64/user/${this.props.user}`)
      .then(response => response.json())
      .then(data => {
        if (data !== null) {
          this.setState({ "disks": data.disks });
        }  // else leave state.disks as []
      });
  }

  render() {

    // allow each one to have a default instead of anything-matches object
    // const { title = "No title provided", programs = [ "No programs provided"], blocksFree = 664 } = this.props.info;
    // const { collection = "Unspecified" } = this.props

    return (
      <ul>
        {this.state.disks.map((item,i) => (
          <li key={i}>{item}</li>
        ))}
{/*            <span className="title" contentEditable suppressContentEditableWarning
              onBlur={ e => this.props.updateInfo('title', e.target.innerText)}>{item.title}</span> | 
            <span className="programs" contentEditable suppressContentEditableWarning
              onBlur={ e => this.props.updateInfo('programs', e.target.innerText)}>{item.programs[0]}</span> | 
            <span className="blocks-free" contentEditable suppressContentEditableWarning
              onBlur={ e => this.props.updateInfo('blocksFree', e.target.innerText)}>{item.blocksFree}</span> blocks free ({collection} collection)
            <button onClick={(e) => this.props.deleteDisk(item)}>Delete Disk</button> */}
      </ul>
    );
  }
};

export default ListDisks;
