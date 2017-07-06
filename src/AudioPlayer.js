import React from 'react';
import './main.scss';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        playingTrack: this.props.track
    };
  }

  render() {
    return (
        <div className="player-container">
        <audio
            src={this.props.track}
            autoPlay
            controls
        >
        Your browser does not support the <code>audio</code> element.
        </audio>
        </div>
    );
  }
}

export default AudioPlayer;