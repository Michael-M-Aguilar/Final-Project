import React from 'react';

export default class CreateCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.addEntry = this.addEntry.bind(this);
  }

  // addEntry(newEntry) {
  //   fetch('/api/entries', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(newEntry)
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({
  //         entries: this.state.entries
  //       });
  //     });
  // }

  handleChange(event) {
    this.setState({
      entry: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entry: this.state.entry })
    });
  }

  // handleChange(event)
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
                {/* <p className="mx-4 my-2 text-header dmTextColor fs-2"> Save </p> */}
              </div>
            </a>
          </div>
          <form className="input-group" onSubmit={this.handleSubmit}>
            <div className="input-row-1 input-group mx-3 border border-4 border-dark rounded ">
              <span className="input-group-text"><i className="fas fa-money-bill-alt fa-2x logoIcon"></i></span>
              <span className="input-group-text fs-5 text-header">$</span>
              <label htmlFor="amount" className="form-label raleway dmTextColor"></label>
              <input type="number" step="0.01" id="amount" name="amount" className=" fs-5 form-control inputBackground numbers dmTextColor" onChange={this.handleChange}></input>
            </div>
            <div className="input-group my-4">
              <label htmlFor="notes" className="form-label raleway dmTextColor fs-3 mx-4">Notes:</label>
              <textarea placeholder="Add a note... (optional)" className="form-control mx-4 inputBackground border border-4 rounded-pill border-dark dmTextColor fs-4 raleway" id="notes" name="notes" rows="1"></textarea>
            </div>
            <div className="input-group my-4">
              <label htmlFor="category" className="form-label raleway dmTextColor fs-3 mx-4">Categories:</label>
              <select className="form-select categories inputBackground raleway fs-5 dmTextColor border border-4 rounded-pill border-dark" id="inputGroupSelect01" required >
                <option selected className="raleway fs-5 dmTextColor">Choose a category...</option>
                <option value="1" className="raleway fs-5 dmTextColor">Auto</option>
                <option value="2" className="raleway fs-5 dmTextColor">Bills</option>
                <option value="3" className="raleway fs-5 dmTextColor">Gifts</option>
                <option value="4" className="raleway fs-5 dmTextColor">Shopping</option>
                <option value="5" className="raleway fs-5 dmTextColor">Travel</option>
              </select>
            </div>
            <div className="input-group my-4">
              <label htmlFor="location" className="form-label raleway dmTextColor fs-3 mx-4">Location:</label>
              <input type="text" id="location" name="location" className="form-control mx-4 inputBackground raleway fs-5 dmTextColor border border-4 rounded-pill border-dark"></input>
            </div>
            <button type="submit" className="btn btn-dark">Save</button>
          </form>
        </div>
      </div>
    );
  }
}
