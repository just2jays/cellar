import React from 'react'
import { Input } from 'semantic-ui-react'
import SongList from './SongList';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        shows: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    if (event.target.value === "") {
      this.setState({
        shows: []
      });
    } else {
        fetch('/collection/'+event.target.value)
        .then(response => response.json())
        .then(json => {
            this.setState({
                shows: json.response.docs
            });
        });
    }
  }

  render() {
    return (
        <div>
            <Input focus placeholder='Search...' onChange={this.handleInputChange} />
            <SongList shows={this.state.shows} />
        </div>
    );
  }
}

export default SearchBar;