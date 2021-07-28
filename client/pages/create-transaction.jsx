import React from 'react';

// Component to create a transaction
export default class CreateTransaction extends React.Component {
  render() {
    return (
      <div className="container ctcontainer desktopBody my-4">
        <div>
          <p className="text-header dmTextColor">Creating New Transactions: </p>
        </div>
        <div className="flex flex-column border border-5 border-dark rounded transactionPosition desktopSecondary py-5">
          <div className="flex justify-content-center my-5">
            <h3 className="text-header dmTextColor px-5">Which would you like to add?</h3>
          </div>
          <div className="flex justify-content-evenly">
            <a href="#create-transaction/credit">
              <div className="border border-4 border-dark rounded-pill">
                <h5 className="raleway dmTextColor px-5 py-2">Credit</h5>
              </div>
            </a>
            <a href="#create-transaction/debit">
              <div className="border border-4 border-dark rounded-pill">
                <h5 className="raleway dmTextColor px-5 py-2">Debit</h5>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
