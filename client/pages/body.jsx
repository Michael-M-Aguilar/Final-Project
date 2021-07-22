import React from 'react';

export default class Body extends React.Component {
  render() {
    return (
      <div className="container hiddenInMobile desktopBody">
        <div className="row1 flex space-between">
          <div>
            <h1 className="dmTextColor text-style-heading">Accounts</h1>
          </div>
          <div>
            <h1 className="dmTextColor text-style-heading">July (Current Month)</h1>
          </div>
        </div>
        <div className="row2 flex">
          <div className="col desktopSecondary">
            <h3 className="text-center dmTextColor text-style-heading">Budget: $5000.00</h3>
          </div>
          <div className="col">
            <h3 className="text-center dmTextColor text-style-heading">Income: $500.00</h3>
          </div>
          <div className="col">
            <h3 className="text-center dmTextColor text-style-heading">Transactions: $400.00 </h3>
          </div>
        </div>
        <div className="row3 flex">
          <div className="col desktopSecondary">
            <h4 className="dmTextColor text-style-heading">Recent Transactions: </h4>
          </div>
          <div className="col desktopSecondary">
            <h4 className="dmTextColor text-style-heading">Spending Chart: </h4>
          </div>
          <div className="logoIcon">
            <i className="fas fa-plus-circle fa-2x"></i>
          </div>
        </div>
      </div>
    );
  }
}
