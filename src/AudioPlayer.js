import React from 'react';
import ReactHowler from 'react-howler';
import { Divider, Container, Button, Progress } from 'semantic-ui-react';
import './main.scss';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        playingTrack: this.props.track,
        playing: true,
        mute: false,
        volume: 1.0,
        loaded: false,
        progressPercent: 0
    };
    
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this)
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  handleOnLoad() {
    this.setState({
      loaded: true,
      duration: this.player.duration()
    });
  }

  handleOnPlay() {
    requestAnimationFrame(this.step.bind(this));
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

  step() {
    var seek = this.player.seek() || 0;
    this.setState({
      progressPercent: (((seek / this.player.duration()) * 100) || 0)
    });

    if (this.state.playing) {
      requestAnimationFrame(this.step.bind(this));
    }
  }

  render() {
    return (
        <div className="player-container">
          <div className="player-container-inner">
            <ReactHowler
              ref={(ref) => (this.player = ref)}
              html5={true}
              src={[this.props.track.trackFile]}
              playing={this.state.playing}
              onLoad={this.handleOnLoad}
              onPlay={this.handleOnPlay}
            />
            <Container textAlign='center'>
              <Progress label={`${this.props.track.trackArtist} - ${this.props.track.trackTitle}`} size='small' className='progress-bar' percent={this.state.progressPercent} />
            </Container>
            <Divider clearing hidden />
            <Container textAlign='center'>
              <Button onClick={this.handlePause} content='Pause' icon='pause' labelPosition='left' />
              <Button onClick={this.handlePlay} content='Play' icon='right arrow' labelPosition='right' />
            </Container>
          </div>
        </div>
    );
  }
}

export default AudioPlayer;