import React from 'react';

// Component to create credit transaction
export default class CreateCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      note: '',
      category: '',
      categories: '',
      location: '',
      date: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.todaysDate = this.todaysDate.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories() {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        this.setState({ categories: data });
      });
  }

  todaysDate() {
    document.getElementById('date').valueAsDate = new Date();
    // eslint-disable-next-line no-undef
    const today = format('YYYY-MM-DD');
    document.getElementById('date').value = today;
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
    if (event.target.id === 'date') {
      this.setState({
        date: event.target.value
      });
    }
  }

  handleSubmit(event) {
    fetch('/api/entries', {
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
    const { categories } = this.state;
    return (
      <div className="container desktop-body">
        <div>
          <h1 className="text-header dm-text">Creating New Credit Transaction: </h1>
        </div>
        <div className="height flex flex-column border border-5 border-dark rounded cd-position desktop-secondary">
          <div className="flex justify-content-start">
            <a href="#create-transaction">
              <i className="fas fa-times-circle fa-3x mx-3 my-4 logo-icon"></i>
            </a>
          </div>
          <form className="" onSubmit={this.handleSubmit}>
            <div className="flex justify-content-between">
            <div className="form-group input-row-1 input-group mx-3 border border-4 border-dark rounded ">
              <span className="input-group-text"><i className="fas fa-money-bill-alt fa-2x logo-icon"></i></span>
              <span className="input-group-text fs-5 text-header">$</span>
              <label htmlFor="amount" className="form-label raleway dm-text"></label>
                <input type="raleway" placeholder="Add a negative entry..." max="-0.01" step="0.01" id="amount" name="amount" className=" fs-5 form-control input-background numbers dm-text" value={this.state.amount} onChange={this.handleChange} required></input>
            </div>
            <div>
              <label className="raleway dm-text mx-3" htmlFor="date">Entry Date:</label>
              <input type="date" id="date" className="raleway dm-text" name="entry-date" value={this.state.date} onChange={this.handleChange} min="2020-01-01" required></input>
            </div>
            </div>
            <div className="form-group input-group my-4">
              <label htmlFor="note" className="form-label raleway dm-text fs-3 mx-4">Notes:</label>
              <input placeholder="Add a note..." className="form-control mx-4 input-background border border-4 rounded-pill border-dark dm-text fs-4 raleway" id="note" name="note" onChange={this.handleChange} required></input>
            </div>
            <div className="form-group input-group my-4">
              <label htmlFor="category" className="form-label raleway dm-text fs-3 mx-4">Categories:</label>
              <select className="form-select cat input-background raleway fs-5 dm-text border border-4 rounded-pill border-dark" id="categories" onChange={this.handleChange} required>
                <option className="raleway fs-5 dm-text" value='' selected disabled>Choose a category...</option>
                {
                (!categories.length)
                  ? '...'
                  : categories.map(cat => (
                  <option key={cat.categoryId} value={cat.categoryId}>{cat.catName}</option>
                  ))
                }
              </select>
            </div>
            <div className="form-group input-group my-4">
              <label htmlFor="location" className="form-label raleway dm-text fs-3 mx-4">Location:</label>
              <input type="text" placeholder="Add a location... (optional)" id="location" name="location" className="form-control mx-4 input-background raleway fs-4 dm-text border border-4 rounded-pill border-dark" value={this.state.location} onChange={this.handleChange}></input>
            </div>
            <div className="flex justify-content-center mx-2">
              <button type="submit" className="btn btn-dark">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
