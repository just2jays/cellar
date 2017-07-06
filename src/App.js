import React from 'react';
import SearchBar from './SearchBar';
import { Switch, Route } from 'react-router-dom';
import CollectionList from './CollectionList';
import ShowList from './ShowList';
import AudioPlayer from './AudioPlayer';

class App extends React.Component {
  constructor() {
      super();
      this.state = {
          shows: [],
          currentTrack: ""
      }
      this.handleSearchChange = this.handleSearchChange.bind(this);
      this.handleTrackChange = this.handleTrackChange.bind(this);
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

handleTrackChange(file) {
  this.setState({
            currentTrack: file
        });
}

  render() {
    return (
      <div id="outer-container" style={{height: '100%'}}>
        <SearchBar onSearchChange={term => this.handleSearchChange(term)} />
        <Switch>
          <Route exact path='/' render={(props) => (
            <CollectionList shows={this.state.shows} />
          )} />
          <Route path='/show/:identifier' render={(props) => (
            <ShowList properties={props} onChangeTrack={file => this.handleTrackChange(file)} />
          )} />
        </Switch>
        <AudioPlayer track={this.state.currentTrack} />
      </div>
    )
  }
}

export default App;