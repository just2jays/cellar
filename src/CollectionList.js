import React from 'react';
import { Table } from 'semantic-ui-react';
import CollectionListRow from './CollectionListRow';

class CollectionList extends React.Component {
    render() {
        var rows = [];
        if(this.props.shows.length > 0){
            this.props.shows.forEach(function(show) {
                rows.push(
                    <CollectionListRow
                        key={show.identifier}
                        identifier={show.identifier}
                        title={show.title}
                        downloads={show.downloads}
                    />
                );
            });
        }
        return (
            <Table selectable>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{rows}</Table.Body>
            </Table>
        );
    }
}
export default CollectionList;