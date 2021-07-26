import React from 'react';

// Component to create a debit transaction
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
         <form className="">
            <div className="input-row-1 input-group mx-3 border border-4 border-dark rounded ">
              <span className="input-group-text"><i className="fas fa-money-bill-alt fa-2x logoIcon"></i></span>
              <span className="input-group-text">$</span>
              <label htmlFor="amount" className="form-label raleway dmTextColor"></label>
              <input type="number" id="amount" name="amount" className="form-control inputBackground numbers dmTextColor"></input>
            </div>
            <div className="input-group my-4">
              <label htmlFor="notes" className="form-label raleway dmTextColor fs-3 mx-4">Notes:</label>
              <textarea placeholder="Add a note... (optional)" className="fs-5 raleway dmTextColor form-control mx-4 inputBackground border border-4 border-dark rounded-pill" id="notes" name="notes" rows="1"></textarea>
            </div>
            <div className="btn-group btn-dark flex" role="group" aria-label="Basic radio toggle button group">
              <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off"></input>
              <label className="btn btn-outline-primary" htmlFor="btnradio1">Deposit</label>
              <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off"></input>
              <label className="btn btn-outline-primary" htmlFor="btnradio2">Salary</label>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
