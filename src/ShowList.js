import React from 'react';
import { Table } from 'semantic-ui-react';
import ShowListRow from './ShowListRow';

var _ = require('lodash');

class ShowList extends React.Component {
    constructor() {
      super();
      this.state = {
          tracks: [],
          currentTrack: ""
      }
      this.handleTrackChange = this.handleTrackChange.bind(this);
  }

    componentDidMount() {
        fetch('/show/'+this.props.properties.match.params.identifier)
        .then(response => response.json())
        .then(json => {
            var mp3Tracks = [];

            _.values(json.files).forEach(function(track) {
                if ( track.format == 'VBR MP3' ) {
                    mp3Tracks.push(track);
                }
            });

            this.setState({
                tracks: mp3Tracks
            });
        });
    }

handleTrackChange(trackId) {
    var newTrack = _.find(this.state.tracks, function(track) { return track.track == trackId; });
    var trackFile = newTrack.original.substr(0, newTrack.original.lastIndexOf('.'));
    var newTrackInfo = {
        trackTitle: newTrack.title,
        trackArtist: newTrack.creator,
        trackFile: "https://archive.org/download/"+this.props.properties.match.params.identifier+"/"+trackFile+".mp3"
    };
    this.props.onChangeTrack(newTrackInfo);
  }

    render() {
        var rows = [];
        if(this.state.tracks.length > 0){
            this.state.tracks.forEach(_.bind(function(track) {
                rows.push(<ShowListRow onTrackChange={trackId => this.handleTrackChange(trackId)} key={track.original} title={track.title} number={track.track} duration={track.length} />);
            }, this));
        }
        return (
            <div className="show-track-list">
                <Table selectable>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>Track #</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Duration</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{rows}</Table.Body>
                </Table>
            </div>
        );
    }
}
export default ShowList;