import React from 'react';

export default class CreditEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      date: '',
      note: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
  }

  handleSubmit(event) {
    fetch('/api/debit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(() => {
        location.hash = '#';
      })
      .catch(err => {
        console.error(err);
      });
    event.preventDefault();
  }

  render() {
    return (
      <form className="" onSubmit={this.handleSubmit}>
        <div className="flex justify-content-between">
          <div className="input-row-1 input-group mx-3 border border-4 border-dark rounded ">
            <span className="input-group-text"><i className="fas fa-money-bill-alt fa-2x logo-icon"></i></span>
            <span className="input-group-text">$</span>
            <label htmlFor="amount" className="form-label raleway dm-text"></label>
            <input type="number" min="0" step="0.01" id="amount" name="amount" className=" fs-5 form-control input-background numbers dm-text" value={this.state.amount} onChange={this.handleChange}></input>
          </div>
          <div>
            <label className="raleway dm-text mx-3" htmlFor="date">Entry Date:</label>
            <input type="date" id="date" className="raleway dm-text" name="entry-date" value={this.state.date} onChange={this.handleChange} min="2020-01-01"></input>
          </div>
        </div>
        <div className="form-group input-group my-4">
          <label htmlFor="note" className="form-label raleway dm-text fs-3 mx-4">Notes:</label>
          <textarea placeholder="Add a note... (optional)" id="note" className="form-control mx-4 input-background border border-4 rounded-pill border-dark dm-text fs-4 raleway" name="note" rows="1" onChange={this.handleChange}></textarea>
        </div>
        <div className="form-group flex justify-content-center">
          <button type="submit" className="btn btn-dark my-3" data-bs-dismiss="modal">Save</button>
        </div>
      </form>
    );
  }
}
