import React from 'react'

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        playingTrack: this.props.track
    };
  }

  render() {
    return (
        <audio
            src={this.props.track}
            autoPlay
            controls
        >
        Your browser does not support the <code>audio</code> element.
        </audio>
    );
  }
}

export default AudioPlayer;