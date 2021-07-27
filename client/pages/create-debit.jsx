import React from 'react';

// Component to create a debit transaction
export default class CreateDebit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      date: '',
      note: '',
      category: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.todaysDate = this.todaysDate.bind(this);
  }

  todaysDate() {
    document.getElementById('date').valueAsDate = new Date();
    // eslint-disable-next-line no-undef
    const today = format('YYYY-MM-DD');
    document.getElementById('date').value = today;
  }

  handleChange(event) {
    if (event.target.id === 'amount') {
      this.setState({ amount: event.target.value });
    }
    if (event.target.id === 'date') {
      this.setState({ date: event.target.value });
    }
    if (event.target.id === 'note') {
      this.setState({ note: event.target.value });
    }
    if (event.target.id === 'deposit') {
      this.setState({ category: 3 });
    }
    if (event.target.id === 'salary') {
      this.setState({ category: 4 });
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
              <i className="fas fa-times-circle fa-3x mx-3 my-4 logoIcon"></i>
            </a>
          </div>
         <form className="" onSubmit={this.handleSubmit}>
           <div className="flex">
            <div className="input-row-1 input-group mx-3 border border-4 border-dark rounded ">
              <span className="input-group-text"><i className="fas fa-money-bill-alt fa-2x logoIcon"></i></span>
              <span className="input-group-text">$</span>
              <label htmlFor="amount" className="form-label raleway dmTextColor"></label>
              <input type="number" min="0" step="0.01" id="amount" name="amount" className=" fs-5 form-control inputBackground numbers dmTextColor" value={this.state.amount} onChange={this.handleChange}></input>
            </div>
            <div>
              <label className="raleway dmTextColor mx-3" htmlFor="date">Entry Date:</label>
              <input type="date" id="date" className="raleway dmTextColor" name="entry-date" value={this.state.date} onChange={this.handleChange} min="2020-01-01"></input>
            </div>
          </div>
            <div className="form-group input-group my-4">
              <label htmlFor="note" className="form-label raleway dmTextColor fs-3 mx-4">Notes:</label>
              <textarea placeholder="Add a note... (optional)" id="note" className="form-control mx-4 inputBackground border border-4 rounded-pill border-dark dmTextColor fs-4 raleway" name="note" rows="1" onChange={this.handleChange}></textarea>
            </div>
            {/* <div className="btn-group btn-dark flex form-group input-group" role="group" aria-label="Basic radio toggle button group">
              <input type="radio" className="btn-check" name="btnradio" id="btnradio1" onChange={this.handleChange} autoComplete="off"></input>
              <label className="btn btn-outline-primary" id="deposit" htmlFor="btnradio1" onChange={this.handleChange}>Deposit</label>
              <input type="radio" className="btn-check" name="btnradio" id="btnradio2" onChange={this.handleChange} autoComplete="off"></input>
              <label className="btn btn-outline-primary" id="salary" htmlFor="btnradio2" onChange={this.handleChange}>Salary</label>
            </div> */}
            <div className="form-group input-group my-4">
              <label htmlFor="category" className="form-label raleway dmTextColor fs-3 mx-4">Categories:</label>
              <select className="form-select categories inputBackground raleway fs-5 dmTextColor border border-4 rounded-pill border-dark" id="categories" onChange={this.handleChange}>
                <option selected className="raleway fs-5 dmTextColor">Choose a category...</option>
                {/* {
                  (!this.state.categories.length)
                    ? '...'
                    : categories.map(cat => (
                      <option key={cat.categoryId} value={cat.categoryId}>{cat.catName}</option>
                    ))
                } */}
              </select>
            </div>
            <div className="form-group flex justify-content-end">
              <button type="submit" className="btn btn-dark my-3">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
