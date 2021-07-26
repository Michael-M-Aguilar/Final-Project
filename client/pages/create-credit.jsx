import React from 'react';

// Component to create credit transaction
export default class CreateCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      note: '',
      category: '',
      location: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  todaysDate() {

  }

  handleChange(event) {
    if (event.target.id === 'amount') {
      this.setState({
        amount: event.target.value
      });
    }
    if (event.target.id === 'note') {
      this.setState({
        note: event.target.value
      });
    }
    if (event.target.id === 'categories') {
      this.setState({
        category: event.target.value
      });
    }
    if (event.target.id === 'location') {
      this.setState({
        location: event.target.value
      });
    }
    // console.log(this.state);
  }

  handleSubmit(event) {
    // console.log(this.state);

    fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        // this.setState({
        //   entry: this.state.entry.concat(data)
        // });
      })
      .catch(err => {
        console.error(err);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="container ctcontainer desktopBody my-4">
        <div>
          <h1 className="text-header dmTextColor">Creating New Transactions: </h1>
        </div>
        <div className="flex flex-column border border-5 border-dark rounded cdPosition desktopSecondary">
          <div className="flex justify-content-between">
            <a href="#create-transaction">
              <i className="fas fa-times-circle fa-2x mx-3 my-4 logoIcon"></i>
            </a>
            {/* <p className="fs-2 mx-3 my-4 text-header dmTextColor">Date (July 23, 2021)</p> */}
            <div>
              <label htmlFor="date">Entry Date:</label>
              <input type="date" id="date" name="entry-date" value="2020-01-01" min="2020-01-01"></input>
            </div>
            {/* <a href="#">
              <div className="border border-3 border-dark rounded mx-3 my-3">
                <p className="mx-4 my-2 text-header dmTextColor fs-2"> Save </p>
              </div>
            </a> */}
          </div>
          <form className="input-group" onSubmit={this.handleSubmit}>
            <div className="form-group input-row-1 input-group mx-3 border border-4 border-dark rounded ">
              <span className="input-group-text"><i className="fas fa-money-bill-alt fa-2x logoIcon"></i></span>
              <span className="input-group-text fs-5 text-header">$</span>
              <label htmlFor="amount" className="form-label raleway dmTextColor"></label>
              <input type="number" step="0.01" id="amount" name="amount" className=" fs-5 form-control inputBackground numbers dmTextColor" value={this.state.amount} onChange={this.handleChange}></input>
            </div>
            <div className="form-group input-group my-4">
              <label htmlFor="note" className="form-label raleway dmTextColor fs-3 mx-4">Notes:</label>
              <textarea placeholder="Add a note... (optional)" className="form-control mx-4 inputBackground border border-4 rounded-pill border-dark dmTextColor fs-4 raleway" id="note" name="note" rows="1" onChange={this.handleChange}></textarea>
            </div>
            <div className="form-group input-group my-4">
              <label htmlFor="category" className="form-label raleway dmTextColor fs-3 mx-4">Categories:</label>
              <select className="form-select categories inputBackground raleway fs-5 dmTextColor border border-4 rounded-pill border-dark" id="categories" value={this.state.category} onChange={this.handleChange}>
                <option selected className="raleway fs-5 dmTextColor">Choose a category...</option>
                <option value="Auto" className="raleway fs-5 dmTextColor">Auto</option>
                <option value="Bills" className="raleway fs-5 dmTextColor">Bills</option>
                <option value="Gifts" className="raleway fs-5 dmTextColor">Gifts</option>
                <option value="Shopping" className="raleway fs-5 dmTextColor">Shopping</option>
                <option value="Travel" className="raleway fs-5 dmTextColor">Travel</option>
              </select>
            </div>
            <div className="form-group input-group my-4">
              <label htmlFor="location" className="form-label raleway dmTextColor fs-3 mx-4">Location:</label>
              <input type="text" id="location" name="location" className="form-control mx-4 inputBackground raleway fs-5 dmTextColor border border-4 rounded-pill border-dark" value={this.state.location} onChange={this.handleChange}></input>
            </div>
            <div className="form-group flex justify-content-end">
              <button type="submit" className="btn btn-dark">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
