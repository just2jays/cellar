import React from 'react';
import { Container } from 'semantic-ui-react';

var _ = require('lodash');

class ArtistInfo extends React.Component {
    constructor() {
      super();
      this.state = {
          creatorInfo: {
              artist: {
                  bio: {
                      summary: ""
                  }
              }
          }
      }
  }

    componentDidMount() {
        fetch('/artist/'+this.props.properties.match.params.creator)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({
                creatorInfo: json
            });
        });
    }

    render() {
        return (
            <Container className="artist-info">{this.state.creatorInfo.artist.bio.summary}</Container>
        );
    }
}
export default ArtistInfo;