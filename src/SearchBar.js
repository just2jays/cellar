import React from 'react'
import { Input } from 'semantic-ui-react'
import CollectionList from './CollectionList';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
        term: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    if (event.target.value === "") {
      this.setState({
        term: ''
      });
    } else {
      this.setState({
        term: event.target.value
      });
      this.props.onSearchChange(event.target.value);
    }
  }

  render() {
    return (
        <div className="search">
            <Input focus placeholder='Search...' onChange={this.handleInputChange} />
        </div>
    );
  }
}

export default SearchBar;