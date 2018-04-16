import React from 'react';
import { Grid, Divider, Label, Segment, List, Container, Header, Image, Rating } from 'semantic-ui-react';
import FavoriteButton from 'Components/common/FavoriteButton/FavoriteButton';
import { find, remove } from 'lodash';

class ArtistInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            isFavorite: false,
            creatorInfo: {
                artist: {
                    name: "",
                    similar: {
                        artist: {
                            name: "",
                            image:[
                                {
                                    "#text": "",
                                    "size": "medium"
                                }
                            ],
                        }
                    },
                    image:[
                        {
                            "#text": "",
                            "size": "large"
                        }
                    ],
                    bio: {
                        summary: ""
                    }
                }
            }
        }

        this.checkFavorite = this.checkFavorite.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
    }

    componentDidMount() {
        fetch('/artist/'+this.props.properties.match.params.creator)
        .then(response => response.json())
        .then(json => {
            this.setState({
                creatorInfo: json
            });
            if( this.checkFavorite() ) {
                this.setState({
                    isFavorite: true
                });
            }
        });
    }

    checkFavorite() {
        var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if( favorites.indexOf(this.state.creatorInfo.artist.name ) >= 0) {
            this.setState({
                isFavorite: true
            });
            return true;
        }else{
            return false;
        }
    }

    handleFavorite(favo) {
        var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if(favo) {
            remove(favorites, _.bind(function(artist){return artist == this.state.creatorInfo.artist.name}, this));
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }else{
            favorites.push(this.state.creatorInfo.artist.name);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }

    render() {
        var rows = [];
        if(this.state.creatorInfo.artist.similar.artist.length > 0){
            this.state.creatorInfo.artist.similar.artist.forEach(function(artist, index) {
                rows.push(
                    <List.Item key={index}>
                        <Image avatar src={_.find(artist.image, {'size':'medium'})['#text']} />
                        <List.Content>
                            <List.Header>{artist.name}</List.Header>
                        </List.Content>
                    </List.Item>
                );
            });
        }
        return (
            <Container className="artist-info">
                <Header as='h2' icon textAlign='center'>
                    <Image shape='circular' size='small' src={_.find(this.state.creatorInfo.artist.image, {'size':'large'})['#text']} />
                    <Header.Content>
                         {this.state.creatorInfo.artist.name}
                    </Header.Content>
                </Header>
                <Divider />
                <Container textAlign='center'>
                    <FavoriteButton onHandleFavorite={favorite => this.handleFavorite(favorite)} favorite={this.state.isFavorite} />
                </Container>
                <Divider hidden={true} />
                <Grid columns={2}>
                    <Grid.Column>
                        <Segment raised>
                            <Label as='a' color='red' ribbon>Overview</Label>
                            <Segment vertical>
                                {this.state.creatorInfo.artist.bio.summary.replace(/<{1}[^<>]{1,}>{1}/g," ").replace("Read more on Last.fm", "")}
                            </Segment>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Label as='a' color='orange' ribbon='right'>Similar Artists</Label>
                            <Segment vertical>
                                <List>
                                    {rows}
                                </List>
                            </Segment>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}
export default ArtistInfo;