import React from 'react'
import { Input } from 'semantic-ui-react'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
  }

  render() {
    return (
        <Input focus placeholder='Search...' onChange={this.handleInputChange} />
    );
  }
}

export default SearchBar;