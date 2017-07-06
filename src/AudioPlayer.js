import React from 'react';
import ReactHowler from 'react-howler';
import { Button } from 'semantic-ui-react';
import './main.scss';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        playingTrack: this.props.track,
        playing: true,
        mute: false,
        volume: 1.0
    };
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  handlePlay() {
    this.setState({
      playing: true
    });
  }

  handlePause() {
    this.setState({
      playing: false
    });
  }

  render() {
    return (
        <div className="player-container">
          <div className="player-container-inner">
            <ReactHowler
              html5={true}
              src={[this.props.track]}
              playing={this.state.playing}
            />
            <Button onClick={this.handlePause} content='Pause' icon='pause' labelPosition='left' />
            <Button onClick={this.handlePlay} content='Play' icon='right arrow' labelPosition='right' />
          </div>
        </div>
    );
  }
}

export default AudioPlayer;