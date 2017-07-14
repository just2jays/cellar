import React from 'react';
import { Button } from 'semantic-ui-react';

class CollectionListRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.favorite){
            this.setState({
                active: true
            });
        }
    }

    handleClick() {
        this.setState({
            active: !this.state.active
        });
        
        this.props.onHandleFavorite(this.state.active);
    }

    render() {
        const { active } = this.state;

        return (
            <Button color={active ? 'red' : ''} active={active} onClick={this.handleClick}
                content='Favorite'
                icon='heart'
            />
        );
    }
}
export default CollectionListRow;