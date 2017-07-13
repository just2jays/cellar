import React from 'react';
import { Menu, Container, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import CollectionList from './CollectionList';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
        term: '',
        activeItem: "home"
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }

  handleInputChange(event) {
    this.props.history.push('/');
    if (event.target.value === "") {
      this.setState({
        term: ''
      });
    } else {
      this.setState({
        term: event.target.value
      });
      this.props.onSearchChange(event.target.value);
    }
  }

  handleMenuItemClick(event){
    this.setState({ activeItem: event.target.name });
  } 

  render() {
    return (
        <Container className='top-search-menu'>
          <Menu pointing secondary>
            <Menu.Item name='home' active={this.state.activeItem === 'home'} onClick={this.handleMenuItemClick} />
            <Menu.Item name='messages' active={this.state.activeItem === 'messages'} onClick={this.handleMenuItemClick} />
            <Menu.Item name='friends' active={this.state.activeItem === 'friends'} onClick={this.handleMenuItemClick} />
            <Menu.Menu position='right'>
              <Menu.Item>
                <Input icon='search' placeholder='Search...' onChange={this.handleInputChange} />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>
    );
  }
}

export default withRouter(SearchBar);