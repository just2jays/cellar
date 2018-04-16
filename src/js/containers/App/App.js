import React from 'react';
import SearchBar from 'Components/common/SearchBar/SearchBar';
import { Switch, Route } from 'react-router-dom';
import CollectionList from 'Components/CollectionList/CollectionList';
import ShowList from 'Components/ShowList/ShowList';
import AudioPlayer from 'Components/AudioPlayer/AudioPlayer';
import ArtistInfo from 'Components/ArtistInfo/ArtistInfo';

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
    var parsedFavs = [];
    _.each(favorites, function(fav){
      parsedFavs.push("\""+fav+"\"");
    });
    this.handleSearchChange(parsedFavs.join(' OR '));
  }

  handleSearchChange(term) {
    if(term === ""){
      return true;
    }

    fetch('/collection/'+term)
    .then(response => {
      console.log(response);
      response.json()})
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