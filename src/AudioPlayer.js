import React from 'react';
import ReactHowler from 'react-howler';
import { Divider, Container, Button, Grid, Progress } from 'semantic-ui-react';
import './main.scss';

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currentShow: {},
        currentTrack: {},
        playing: true,
        mute: false,
        volume: 1.0,
        loaded: false,
        progressPercent: 0,
        playIcon: 'play'
    };
    
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this)
    this.handleOnEnd = this.handleOnEnd.bind(this)
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }
  handleNext(){
    var newTrack = _.findIndex(this.props.show, _.bind(function(findtrack) { return parseInt(findtrack.track, 10) == (parseInt(this.props.track.track, 10)+1); }, this));
    newTrack = this.props.show[newTrack];

    var trackFile = newTrack.original.substr(0, newTrack.original.lastIndexOf('.'));
    newTrack.fileLocation = "https://archive.org/download/"+this.props.fullResponse.metadata.identifier[0]+"/"+trackFile+".mp3"

    this.props.onTrackChange(newTrack);
  }
  handlePrevious(){
    var newTrack = _.findIndex(this.props.show, _.bind(function(findtrack) { return parseInt(findtrack.track, 10) == (parseInt(this.props.track.track, 10)-1); }, this));
    newTrack = this.props.show[newTrack];

    var trackFile = newTrack.original.substr(0, newTrack.original.lastIndexOf('.'));
    newTrack.fileLocation = "https://archive.org/download/"+this.props.fullResponse.metadata.identifier[0]+"/"+trackFile+".mp3"

    this.props.onTrackChange(newTrack);
  }

  handleOnLoad() {
    this.setState({
      loaded: true,
      duration: this.player.duration(),
      playing: true
    });
  }

  handleOnPlay() {
    requestAnimationFrame(this.step.bind(this));
    this.setState({
      playing: true,
      playIcon: 'pause'
    });
  }

  handleOnEnd() {
    this.handleNext();
  }

  handlePlayPause() {
    if(this.state.playing) {
      this.setState({
        playing: false,
        playIcon: 'play'
      });
    }else{
      this.setState({
        playing: true,
        playIcon: 'pause'
      });
    }
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
              src={[this.props.track.fileLocation]}
              playing={this.state.playing}
              onLoad={this.handleOnLoad}
              onPlay={this.handleOnPlay}
              onEnd={this.handleOnEnd}
            />
            <Grid divided>
              <Grid.Row>
                <Grid.Column width={4}>
                  <div className="show-image-holder" style={{backgroundImage: `url(${this.props.fullResponse.misc.image})`}} />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Progress label={`${this.props.track.creator} - ${this.props.track.title}`} size='small' className='progress-bar' percent={this.state.progressPercent} />
                  <Container textAlign='center'>
                    <Button onClick={this.handlePrevious} icon='fast backward' />
                    <Button circular onClick={this.handlePlayPause} icon={this.state.playIcon} />
                    <Button onClick={this.handleNext} icon='fast forward' />
                  </Container>
                </Grid.Column>
                <Grid.Column width={4}></Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
    );
  }
}

export default AudioPlayer;