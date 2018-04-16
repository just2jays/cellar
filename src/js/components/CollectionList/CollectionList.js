import React from 'react';
import { Container, Table } from 'semantic-ui-react';
import CollectionListRow from './CollectionListRow/CollectionListRow';

class CollectionList extends React.Component {
    render() {
        var rows = [];
        if(this.props.shows.length > 0){
            this.props.shows.forEach(function(show) {
                rows.push(
                    <CollectionListRow
                        key={show.identifier}
                        identifier={show.identifier}
                        creator={show.creator}
                        title={show.title}
                        downloads={show.downloads}
                    />
                );
            });
        }
        return (
            <Container className="show-list">
                <Table selectable>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>Show</Table.HeaderCell>
                        <Table.HeaderCell>Artist</Table.HeaderCell>
                        <Table.HeaderCell>Downloads</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{rows}</Table.Body>
                </Table>
            </Container>
        );
    }
}
export default CollectionList;