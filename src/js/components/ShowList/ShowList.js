import React from 'react';
import { Container, Table } from 'semantic-ui-react';
import ShowListRow from './ShowListRow/ShowListRow';

var _ = require('lodash');

class ShowList extends React.Component {
    constructor() {
      super();
      this.state = {
          tracks: [],
          currentTrack: "",
          showImage: "",
          showData: {}
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
                showData: json,
                tracks: mp3Tracks
            });
        });
    }

handleTrackChange(trackId) {
    var newTrack = _.find(this.state.tracks, function(track) { return track.track == trackId; });
    
    var playerObject = {
        fullShowResponse: this.state.showData,
        track: newTrack,
        show: this.state.tracks
    }

    this.props.onChangeTrack(playerObject);
  }

    render() {
        var rows = [];
        if(this.state.tracks.length > 0){
            this.state.tracks.forEach(_.bind(function(track) {
                rows.push(<ShowListRow onTrackChange={trackId => this.handleTrackChange(trackId)} key={track.original} title={track.title} number={track.track} duration={track.length} />);
            }, this));
        }
        return (
            <Container className="show-track-list">
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
            </Container>
        );
    }
}
export default ShowList;