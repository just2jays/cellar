import React from 'react';

import { Divider, Container, Button, Grid, Progress } from 'semantic-ui-react';
import './main.scss';

class AudioPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTrack: {},
			playing: false,
			progressPercent: 0,
			playIcon: 'play',
			sound: new Howl({src:[""]})
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			currentTrack: nextProps.track
		});

		this.state.sound.unload();
		this.state.sound = new Howl({
			src: [this.state.currentTrack.fileLocation],
			html5: true
		});

		this.state.sound.play();
	}



	render() {
		return (
			<div className="player-container">
				<div className="player-container-inner">
					<Grid divided>
						<Grid.Row>
							<Grid.Column width={4}>
								<div className="show-image-holder" style={{ backgroundImage: `url(${this.props.fullResponse.misc.image})` }} />
							</Grid.Column>
							<Grid.Column width={8}>
								<Progress label={`${this.props.track.creator} - ${this.props.track.title}`} size='small' className='progress-bar' percent={this.state.progressPercent} />
								<Container textAlign='center'>
									{/* <Button circular onClick={this.handlePlayPause} icon={this.state.playIcon} /> */}
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