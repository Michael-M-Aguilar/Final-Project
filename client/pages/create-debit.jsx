import React from 'react';

export default class CreateDebit extends React.Component {
  render() {
    return (
      <div className="container ctcontainer desktopBody my-4">
        <div>
          <h1 className="text-header dmTextColor">Creating New Transactions: </h1>
        </div>
        <div className="flex flex-column border border-5 border-dark rounded cdPosition desktopSecondary">
          <div className="flex justify-content-between">
            <a href="#create-transaction">
              <i className="fas fa-times-circle fa-3x mx-3 my-4 logoIcon"></i>
            </a>
            <p className="fs-2 mx-3 my-4 text-header dmTextColor">Date (July 23, 2021)</p>
            <a href="#">
              <div className="border border-3 border-dark rounded mx-3 my-3">
                <p className="mx-4 my-2 text-header dmTextColor fs-2"> Save </p>
              </div>
            </a>
          </div>
          <div className="row-2 border border-3 border-dark rounded ">
            <i className="fas fa-money-bill-alt fa-2x logoIcon"></i>
          </div>
          <div>
            <p className="dmTextColor raleway fs-2 mx-4 mt-2">Note: From selling Shoes.</p>
          </div>
        </div>
      </div>
    );
  }
}
