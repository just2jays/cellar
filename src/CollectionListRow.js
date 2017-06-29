import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

class CollectionListRow extends React.Component {
  render() {
    var title = this.props.title;
    var downloads = this.props.downloads;
    var identifier = this.props.identifier;
    
    return (
        <Table.Row>
            <Table.Cell><Link to={`/show/${identifier}`}>{title}</Link></Table.Cell>
            <Table.Cell>{downloads}</Table.Cell>
        </Table.Row>
    );
  }
}
export default CollectionListRow;