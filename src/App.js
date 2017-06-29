import React from 'react';
import SearchBar from './SearchBar';
import CollectionList from './CollectionList';

class App extends React.Component {
  constructor() {
      super();
      this.state = {
          shows: []
      }
      this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(term) {
    fetch('/collection/'+term)
    .then(response => response.json())
    .then(json => {
        this.setState({
            shows: json.response.docs
        });
    });
  }

  render() {
    return (
      <div id="outer-container" style={{height: '100%'}}>
        <SearchBar onSearchChange={term => this.handleSearchChange(term)} />
        <CollectionList shows={this.state.shows} />
      </div>
    )
  }
}

export default App;