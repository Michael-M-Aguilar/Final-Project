import React from 'react';

export default class CreateCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: '',
      catName: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.id === 'catName') {
      this.setState({ catName: event.target.value });
    }
  }

  handleSubmit(event) {
    fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(() => {
        location.hash = 'folder';
      })
      .catch(err => {
        console.error(err);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="container ctcontainer desktopBody">
        <div className="mx-2">
          <h1 className="text-header dmTextColor mt-1">Creating New Category:</h1>
        </div>
        <div className="flex overflow flex-column border border-5 border-dark rounded transactionHistory desktopSecondary mx-1">
          <div className="flex justify-content-center">
            <p className="text-header dmTextColor mx-4">Category Name</p>
          </div>
          <div className="flex justify-content-start">
            <a href="#folder">
              <i className="fas fa-times-circle fa-3x mx-3 my-4 logoIcon"></i>
            </a>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="flex justify-content-center">
              <label htmlFor="catName" className="form-label raleway dmTextColor"></label>
              <input type="text" id="catName" name="catName" className=" fs-5 form-control inputBackground numbers dmTextColor border-4 border-dark" onChange={this.handleChange}></input>
            </div>
            <div className="form-group flex justify-content-center my-3">
              <button type="submit" className="btn btn-dark rounded mx-4">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
