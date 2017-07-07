import React from 'react'
import { Container, Input } from 'semantic-ui-react'
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
        <Container textAlign='center'>
          <div className="search">
              <Input icon='search' placeholder='Search...' onChange={this.handleInputChange} />
          </div>
        </Container>
    );
  }
}

export default SearchBar;