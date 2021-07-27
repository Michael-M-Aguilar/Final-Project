import React from 'react';
import Body from './body';

export default class Home extends React.Component {
  render() {
    return (
      // Loads our body inside a container.
      <div className="container">
        <Body />
     </div>
    );
  }
}
