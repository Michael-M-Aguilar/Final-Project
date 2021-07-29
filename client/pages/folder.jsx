import React from 'react';

export default class Folders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      categories: ''
    };
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

  render() {
    const { categories } = this.state;
    return (
      <div className="container ctcontainer desktopBody my-3">
        <div className="my-3 mx-2">
          <h1 className="text-header dmTextColor">List of all Transactions</h1>
        </div>
        <div className="max-height flex overflow flex-column border border-5 border-dark rounded transactionHistory desktopSecondary mx-1 my-3">
          <div className="flex justify-content-between">
            <p className="text-header dmTextColor mx-4">Current Categories:</p>
            <a href="#create-category">
              <i className="fas fa-plus-circle fa-5x mx-4 my-4 logoIcon"></i>
            </a>
          </div>
          <div>
          {
              (!this.state.categories.length)
                ? '...'
                : categories.map(key => (
              <div key={key.categoryId} className="flex space-between border-top border-1 py-2 mx-3">
                <p className="fs-2 dmTextColor mx-3 raleway">{key.catName}</p>
              </div>
                ))
          }
          </div>
        </div>
      </div>
    );
  }
}
