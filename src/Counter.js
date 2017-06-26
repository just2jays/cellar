import React from 'react';

/**
 * A counter button: tap the button to increase the count.
 */
class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }
 
componentDidMount() {
  fetch('/github')
  .then(response => response.json())
  .then((data) => {
    const repos = data.map((repo) =>
      <p key={repo.id}>{repo.name}</p>
    );
    this.setState({ repos })
  });
}

  render() {
    return (
      <button
        onClick={() => {
          this.setState({ count: this.state.count + 1 });
        }}
      >
        Count: {this.state.count}
      </button>
    );
  }
}
export default Counter;