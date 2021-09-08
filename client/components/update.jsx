import React from 'react';

class UpdateEntry extends React.Component {
  render() {
    return (
    <div className="container create-body overflow">
      <p className="fs-5 dm-text raleway">{this.props.test}This is a trial</p>
    </div>
    );
  }
}

export default UpdateEntry;
