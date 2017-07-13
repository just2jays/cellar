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
        });

        // Check local storage if favorite
    }

    checkFavorite() {
        var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if( favorites.indexOf(this.props.artist ) >= 0) {
            return true;
        }else{
            return false;
        }
    }

    handleFavorite() {
        var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if(!this.state.isFavorite) {
            // favorites.push(this.state.artist);
            // localStorage.setItem('favorites', JSON.stringify(favorites));
            console.log('add to favorites!');
            this.setState({
                isFavorite: true
            });
        }else{
            // _.remove(favorites, _.bind(function(artist){return artist == this.state.artist}, this));
            // localStorage.setItem('favorites', JSON.stringify(favorites));
            console.log('remove from favorites...');
            this.setState({
                isFavorite: true
            });
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