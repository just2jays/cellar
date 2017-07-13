import React from 'react';
import { Button } from 'semantic-ui-react';

class CollectionListRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: ''
        }
        this.handleFavorite = this.handleFavorite.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
        if(this.props.favorite){
            this.setState({
                color: 'red'
            });
        }else{
            this.setState({
                color: ''
            });
        }       
    }

    handleFavorite() {        
        this.props.onHandleFavorite();
    }

    render() {
        return (
            <Button
                color={this.state.color}
                content='Favorite'
                icon='heart'
                onClick={this.handleFavorite}
            />
        );
    }
}
export default CollectionListRow;