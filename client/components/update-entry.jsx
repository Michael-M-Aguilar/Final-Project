import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import CreditEntry from './credit-comp';

export default class UpdateExpenseEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      note: '',
      category: '',
      date: '',
      address: '',
      categories: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.renderPlaces = this.renderPlaces.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.getIndivCredit = this.getIndivCredit.bind(this);
    this.handleCreditSubmit = this.handleCreditSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.entryId && this.props.entryId !== prevProps.entryId) {
      this.getIndivCredit();
    }
  }

  componentDidMount() {
    this.getCategories();
  }

  getIndivCredit() {
    fetch(`/api/entries/${this.props.entryId}`)
      .then(res => res.json())
      .then(results => {
        this.setState({
          amount: Math.abs(results[0].amount),
          note: results[0].note,
          category: results[0].categoryId,
          date: results[0].date.slice(0, 10),
          address: results[0].location
        });
      });
  }

  getCategories() {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        this.setState({ categories: data });
      });
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
    if (event.target.id === 'date') {
      this.setState({
        date: event.target.value
      });
    }
  }

  handleSubmit(event) {
    const eid = parseInt(this.props.entryId);
    const amount = parseInt(this.state.amount);
    const note = this.state.note;
    const category = parseInt(this.state.category);
    const date = this.state.date;
    const address = this.state.address;

    const updatedEntry = {
      entryId: eid,
      categoryId: category,
      amount: amount,
      note: note,
      location: address,
      date: date
    };

    fetch(`/api/entries/${this.props.entryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEntry)
    })
      .then(res => res.json())
      .then(() => {
        this.props.entries();
      })
      .catch(err => {
        console.error(err);
      });
    event.preventDefault();
  }

  handleCreditSubmit(event) {
    const eid = parseInt(this.props.entryId);
    const amount = parseInt(this.state.amount);
    const note = this.state.note;
    const date = this.state.date;

    const updatedEntry = {
      entryId: eid,
      amount: amount,
      note: note,
      date: date
    };

    fetch(`/api/debit/${this.props.entryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEntry)
    })
      .then(res => res.json())
      .then(() => {
        this.props.entries();
      })
      .catch(err => {
        console.error(err);
      });
    event.preventDefault();
  }

  handleAddressChange(address) {
    this.setState({ address });
    if (event.target.id === 'address') {
      this.setState({
        address: event.target.value
      });
    }
  }

  handleSelect(address) {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .catch(error => console.error('Error', error));
  }

  renderPlaces() {
    return (
      <PlacesAutocomplete value={this.state.address} onChange={this.handleAddressChange} onSelect={this.handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          this.renderInput({ getInputProps, suggestions, getSuggestionItemProps, loading })
        )}
      </PlacesAutocomplete>
    );
  }

  renderInput({ getInputProps, suggestions, getSuggestionItemProps, loading }) {
    return (
      <>
        <label className="google-label dm-text raleway fs-3 mx-4">Location:</label>
        <input {...getInputProps({ placeholder: '(This is optional)...' })} id="address" className="form-control mx-1 input-background raleway fs-4 dm-text border border-4 rounded-pill border-dark" />
        <div className="location-dropdown">
          {loading
            ? <div> ... loading </div>
            : ''}
          {suggestions.map(suggestion => {
            const className = suggestion.active
              ? 'suggestion-item-active'
              : 'suggestion';
            const style = suggestion.active
              ? { backgroundColor: '#616E7C', cursor: 'pointer' }
              : { backgroundColor: '#3E4C59', cursor: 'pointer' };
            return (
              <div {...getSuggestionItemProps(suggestion, {
                className, style
              })}
                key={suggestion.index}
                className="dm-text raleway mx-3">
                <span>{suggestion.description}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  render() {
    const renderPlaces = this.renderPlaces();
    const { categories } = this.state;
    if (!this.props.entryId) {
      return '';
    } else {
      console.log('What result value is: ', this.state.category);
      if (this.state.category !== 9) {
        return (
        <form onSubmit={this.handleSubmit}>
          <div className="flex justify-content-between">
            <div className="input-group mx-3 border border-4 border-dark rounded ">
              <span className="input-group-text fs-5 text-header">$</span>
              <label htmlFor="amount" className="form-label raleway dm-text"></label>
              <input type="number" placeholder="Add an expense..." min="0.01" step="0.01" id="amount" name="amount" className=" fs-5 form-control input-background numbers dm-text" value={this.state.amount} onChange={this.handleChange} required></input>
            </div>
            <div className="mx-1">
              <label className="raleway dm-text fs-4" htmlFor="date">Entry Date:</label>
              <input type="date" id="date" className="raleway dm-text" name="entry-date" value={this.state.date} onChange={this.handleChange} min="2020-01-01" required></input>
            </div>
          </div>
          <div className="form-group input-group my-4">
            <label htmlFor="note" className="form-label raleway dm-text fs-3 mx-4">Notes:</label>
            <input placeholder="Add a note..." className="form-control mx-4 input-background border border-4 rounded-pill border-dark dm-text fs-4 raleway" value={this.state.note}id="note" name="note" onChange={this.handleChange} required></input>
          </div>
          <div className="form-group input-group my-4">
            <label htmlFor="category" className="form-label raleway dm-text fs-3 mx-4">Categories:</label>
            <select className="form-select cat input-background raleway fs-5 dm-text border border-4 rounded-pill border-dark" id="categories" onChange={this.handleChange} required>
              <option className="raleway fs-5 dm-text" defaultValue='' disabled>Choose a category...</option>
              {
                (!categories.length)
                  ? '...'
                  : categories.filter(cat => (cat.categoryId !== 9)).map(cat => (
                    <option key={cat.categoryId} value={cat.categoryId} id={cat.catName} className="category-name">{cat.catName}</option>
                  ))
              }
            </select>
          </div>
          <div className="form-group input-group my-4">
            {renderPlaces}
          </div>
          <div className="modal-footer flex justify-content-between">
            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
            <button type="submit" id="entryId" className="btn btn-dark rounded mx-4" data-bs-dismiss="modal">Update</button>
          </div>
        </form>
        );
      } else {
        return (
          <form className="" onSubmit={this.handleCreditSubmit}>
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
              <input placeholder="Add a note..." className="form-control mx-4 input-background border border-4 rounded-pill border-dark dm-text fs-4 raleway" value={this.state.note} id="note" name="note" onChange={this.handleChange} required></input>
            </div>
            <div className="form-group flex justify-content-center">
              <button type="submit" className="btn btn-dark my-3" data-bs-dismiss="modal">Save</button>
            </div>
          </form>
        );
      }
    }
  }
}
