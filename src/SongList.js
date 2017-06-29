import React from 'react';
import { Table } from 'semantic-ui-react';
import SongListRow from './SongListRow';

/**
 * A counter button: tap the button to increase the count.
 */
class SongList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shows: this.props.shows // Why is this not working?!
        };
    }

    render() {
        var rows = [];
        if(this.props.shows.length > 0){
            this.props.shows.forEach(function(show) {
                rows.push(<SongListRow key={show.identifier} title={show.title} downloads={show.downloads} />);
            });
        }
        return (
            <Table basic>
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
export default SongList;