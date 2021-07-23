import React from 'react';

export default class CreateTransaction extends React.Component {
  render() {
    return (
      <div className="container ctcontainer desktopBody">
        <div>
          <h1 className="text-header dmTextColor">Creating New Transactions: </h1>
        </div>
        <div className="flex justify-content-center flex-column border border-5 border-dark rounded transactionPosition desktopSecondary">
          <div className="flex justify-content-center">
            <h3 className="text-header dmTextColor px-5 py-5">Which would you like to add?</h3>
          </div>
          <div className="flex justify-content-evenly">
            <div className="border border-4 border-dark rounded">
              <h5 className="raleway dmTextColor px-5 py-2">Credit</h5>
            </div>
            <div className="border border-4 border-dark rounded">
              <h5 className="raleway dmTextColor px-5 py-2">Debit</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
