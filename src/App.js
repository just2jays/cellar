import React from 'react';
import SearchBar from './SearchBar';
import SongList from './SongList';

class App extends React.Component {
  constructor() {
      super();
      this.state = {
          searchText: '',
          searchResults: []
      }
  }

  onChange(e) {
      console.log(e.target.value);
  }

  render() {
    return (
      <div>
        <SearchBar />
        <SongList />
      </div>
    )
  }
}

export default App;