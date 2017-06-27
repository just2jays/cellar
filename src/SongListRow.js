class SongListRow extends React.Component {
  render() {
    var title = this.props.title;
    var downloads = this.props.downloads;
    
    return (
        <Table.Row>
            <Table.Cell>{title}</Table.Cell>
            <Table.Cell>{downloads}</Table.Cell>
        </Table.Row>
    );
  }
}