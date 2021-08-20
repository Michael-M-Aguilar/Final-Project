import React from 'react';

export default class ErrorCatcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      info: null
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      error: error,
      info: info
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="wrapper">
          <p className="dm-text text-header">Something went wrong. Please try again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
