import React from 'react';
import { Table } from 'semantic-ui-react';
import ShowListRow from './ShowListRow';

class ShowList extends React.Component {
    constructor() {
      super();
      this.state = {
          shows: []
      }
  }

    componentDidMount() {
        // console.log(this.props);
        fetch('/show/'+this.props.match.params.identifier)
        .then(response => response.json())
        .then(json => {
            // console.log(json);
            // angular.forEach(response.data.files, function(value, key) {
            //     if ( value.format == 'VBR MP3' ) {
            //         var amplitudeFile = new Object();
            //         mp3Files[key] = value;
            //         amplitudeFile['name'] = value.title;
            //         amplitudeFile['artist'] = value.creator;
            //         amplitudeFile['url'] = 'https://archive.org/download/'+$routeParams.showIdentifier+key;
            //         amplitudeConfig.songs.push(amplitudeFile);
            //     }
            // });
            var mp3Tracks = [];
            json.files.forEach(function(track) {
                if ( track.format == 'VBR MP3' ) {
                    mp3Tracks.push();
                }
            });
            console.log(mp3Tracks);
            this.setState({
                tracks: mp3Tracks
            });
        });
    }
    render() {
        console.log(this.state.tracks);
        // var rows = [];
        // if(this.props.match.params.identifier){
        //     this.props.shows.forEach(function(show) {
        //         rows.push(<CollectionListRow key={show.identifier} title={show.title} downloads={show.downloads} />);
        //     });
        // }
        return (
            // <Table basic>
            //     <Table.Header>
            //         <Table.Row>
            //         <Table.HeaderCell>Name</Table.HeaderCell>
            //         <Table.HeaderCell>Status</Table.HeaderCell>
            //         </Table.Row>
            //     </Table.Header>
            //     <Table.Body>{rows}</Table.Body>
            // </Table>
            <div />
        );
    }
}
export default ShowList;