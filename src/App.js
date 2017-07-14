import React from 'react';
import SearchBar from './SearchBar';
import { Switch, Route } from 'react-router-dom';
import CollectionList from './CollectionList';
import ShowList from './ShowList';
import AudioPlayer from './AudioPlayer';
import ArtistInfo from './ArtistInfo';

class App extends React.Component {
  constructor() {
      super();
      this.state = {
          shows: [],
          currentTrack: {},
          fullResponse: {
            misc: {}
          },
          currentShow: {}
      }
      this.handleSearchChange = this.handleSearchChange.bind(this);
      this.handleTrackChange = this.handleTrackChange.bind(this);
      this.handleOnTrackChange = this.handleOnTrackChange.bind(this);
  }

  componentDidMount() {
    var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    this.handleSearchChange(favorites.join(' OR '));
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

handleOnTrackChange(trackObject){
  this.setState({
    currentTrack: trackObject
  });
}

handleTrackChange(trackObject) {
  var fullResponse = trackObject.fullShowResponse;
  var currentTrack = trackObject.track;
  var currentShow = trackObject.show;

  var newTrack = _.find(currentShow, function(track) { return track.track == currentTrack.track; });
  var trackFile = newTrack.original.substr(0, newTrack.original.lastIndexOf('.'));
  currentTrack.fileLocation = "https://archive.org/download/"+fullResponse.metadata.identifier[0]+"/"+trackFile+".mp3"

  this.setState({
      fullResponse: fullResponse,
      currentShow: currentShow,
      currentTrack: currentTrack
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
            <ShowList properties={props} onChangeTrack={trackObject => this.handleTrackChange(trackObject)} />
          )} />
          <Route path='/artist/:creator' render={(props) => (
            <ArtistInfo properties={props} />
          )} />
        </Switch>
        <AudioPlayer onTrackChange={trackObject => this.handleOnTrackChange(trackObject)} fullResponse={this.state.fullResponse} show={this.state.currentShow} track={this.state.currentTrack} />
      </div>
    )
  }
}

export default App;