import React from 'react';
import SearchBar from './SearchBar';
import { Switch, Route } from 'react-router-dom';
import CollectionList from './CollectionList';
import ShowList from './ShowList';

class App extends React.Component {
  constructor() {
      super();
      this.state = {
          shows: []
      }
      this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(term) {
    fetch('/collection/'+term)
    .then(response => response.json())
    .then(json => {
        this.setState({
            shows: json.response.docs
        });
    });
  }

  render() {
    return (
      <div id="outer-container" style={{height: '100%'}}>
        <SearchBar onSearchChange={term => this.handleSearchChange(term)} />
        <Switch>
          <Route exact path='/' render={(props) => (
            <CollectionList shows={this.state.shows} />
          )} />
          <Route path='/show/:identifier' component={ShowList}/>
        </Switch>
      </div>
    )
  }
}

export default App;