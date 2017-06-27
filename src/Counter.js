import React from 'react';
import { Button } from 'semantic-ui-react'

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
 
  render() {
    return (
      <Button primary>Primary</Button>
    );
  }
}
export default Counter;