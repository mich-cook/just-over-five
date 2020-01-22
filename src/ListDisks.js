import React, {Component} from 'react';

class ListDisks extends Component {
  render() {

    // allow each one to have a default instead of anything-matches object
    // const { title = "No title provided", programs = [ "No programs provided"], blocksFree = 664 } = this.props.info;
    const { collection = "Unspecified" } = this.props

    return (
      <ul>
        {this.props.disks.map((item,i) => (
          <li key={i}>
            <span className="title" contentEditable suppressContentEditableWarning
              onBlur={ e => this.props.updateInfo('title', e.target.innerText)}>{item.title}</span> | 
            <span className="programs" contentEditable suppressContentEditableWarning
              onBlur={ e => this.props.updateInfo('programs', e.target.innerText)}>{item.programs[0]}</span> | 
            <span className="blocks-free" contentEditable suppressContentEditableWarning
              onBlur={ e => this.props.updateInfo('blocksFree', e.target.innerText)}>{item.blocksFree}</span> blocks free ({collection} collection)
            <button onClick={(e) => this.props.deleteDisk(item)}>Delete Disk</button>
          </li>
        ))}
      </ul>
    );
  }
};

export default ListDisks;
