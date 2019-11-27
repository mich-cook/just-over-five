import React, {Component} from 'react';

class SearchDisks extends Component {
  render() {

// handle asc/desc too

    return (
      <form>
        <label>
          <input type="text" name="keyword" placeholder="keyword" onChange={ e => this.props.changeOrder} />
        </label>
        <select defaultValue={'DEFAULT'} onChange={ e => this.props.changeOrder(e)}>
          <option value={this.props.orderBy === 'title' ? 'DEFAULT' : 'title'}>Title</option>
          <option value={this.props.orderBy === 'game' ? 'DEFAULT' : 'game'}>Game</option>
          <option value={this.props.orderBy === 'blocksFree' ? 'DEFAULT' : 'blocksFree'}>Blocks Free</option>
        </select>
      </form>
    );
  }
};

export default SearchDisks;
