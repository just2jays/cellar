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
    this.goHome = this.goHome.bind(this);
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

  goHome() {
    this.props.history.push('/');
  }

  render() {
    return (
        <Container className='top-search-menu'>
          <Menu pointing secondary>
            <Menu.Item name='home' onClick={this.goHome} active={true} />
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