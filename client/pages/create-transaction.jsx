import React from 'react';

// Component to create a transaction
export default class CreateTransaction extends React.Component {
  render() {
    return (
      <div className="container desktop-body">
        <div>
          <h1 className="text-header dm-text">Creating New Transactions: </h1>
        </div>
        <div className="border border-5 border-dark rounded transaction-position desktop-secondary py-4">
          <div className="flex justify-content-center my-5">
            <h3 className="text-header dm-text px-5">Which would you like to add?</h3>
          </div>
          <div className="flex justify-content-evenly">
            <a href="#create-transaction/credit">
              <button className="border border-4 credit-button border-dark rounded-pill" data-tooltip="Click to create an expense">
                <h5 className="raleway dm-text px-3 py-2">Expense</h5>
              </button>
            </a>
            <a href="#create-transaction/debit">
              <button className="border border-4 credit-button border-dark rounded-pill" data-tooltip="Click to create an income">
                <h5 className="raleway dm-text px-3 py-2">Income</h5>
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
