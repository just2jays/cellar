import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

class ShowListRow extends React.Component {
    constructor() {
    super();
    this.state = {
        term: ''
    };
    this.changeTrack = this.changeTrack.bind(this);
  }

  changeTrack(event) {
      event.preventDefault();
      this.props.onTrackChange(event.target.getAttribute('data-tracknum'));
  }

  render() {
    var title = this.props.title;
    var number = this.props.number;
    var duration = this.props.duration;

    return (
        <Table.Row>
            <Table.Cell>{number}</Table.Cell>
            <Table.Cell><a data-tracknum={number} href="#" onClick={this.changeTrack}>{title}</a></Table.Cell>
            <Table.Cell>{duration}</Table.Cell>
        </Table.Row>
    );
  }
}
export default ShowListRow;