import React from 'react';
import { Container, Header, Image, Rating } from 'semantic-ui-react';
import FavoriteButton from './FavoriteButton';

var _ = require('lodash');

class ArtistInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            isFavorite: false,
            creatorInfo: {
                artist: {
                    name: "",
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
            console.log(this.state);
        });

        // Check local storage if favorite
    }

    checkFavorite() {
        var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if( favorites.indexOf(this.state.creatorInfo.artist.name ) >= 0) {
            console.log('yeah we have that here');
            this.setState({
                isFavorite: true
            });
            return true;
        }else{
            console.log('no sign of it...');
            return false;
        }
    }

    handleFavorite(favo) {
        var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if(favo) {
            _.remove(favorites, _.bind(function(artist){return artist == this.state.creatorInfo.artist.name}, this));
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }else{
            favorites.push(this.state.creatorInfo.artist.name);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }

    render() {
        return (
            <Container className="artist-info">
                <Header as='h2' icon textAlign='center'>
                    <Image shape='circular' size='small' src={_.find(this.state.creatorInfo.artist.image, {'size':'large'})['#text']} />
                    <Header.Content>
                         {this.state.creatorInfo.artist.name}
                    </Header.Content>
                </Header>
                <FavoriteButton onHandleFavorite={favorite => this.handleFavorite(favorite)} favorite={this.state.isFavorite} />
            </Container>
        );
    }
}
export default ArtistInfo;