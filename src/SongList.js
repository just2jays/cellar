import React from 'react';

/**
 * A counter button: tap the button to increase the count.
 */
class SongList extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }
 
    componentDidMount() {
        fetch('/collection/ween')
        .then(response => response.json())
        .then((data) => {
            this.setState({ shows: data.docs })
        });
    }

    render() {
        console.log(this.state);
        var rows = [];
        var lastCategory = null;
        this.state.shows.forEach(function(show) {
            rows.push(<SongListRow title={show.title} downloads={show.downloads} />);
        });
        return (
            <Table basic>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>{rows}</Table.Body>
            </Table>
        );

        // return (
        //     <table>
        //     <thead>
        //         <tr>
        //         <th>Name</th>
        //         <th>Price</th>
        //         </tr>
        //     </thead>
        //     <tbody>{rows}</tbody>
        //     </table>
        // )
    }
}
export default SongList;