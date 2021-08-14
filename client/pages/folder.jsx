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
      <div className="container ctcontainer desktop-body my-3">
        <div className="my-3 mx-2">
          <h1 className="text-header dm-text fs-1">List of Categories:</h1>
        </div>
        <div className="max-height flex overflow flex-column border border-5 border-dark rounded transaction-history desktop-secondary mx-1 my-3">
          <div className="flex justify-content-end mx-4">
            <a href="#create-category">
              <i className="fas fa-plus-circle fa-5x my-4 logo-icon"></i>
            </a>
          </div>
          <div>
          {
              (!this.state.categories.length)
                ? '...'
                : categories.map(key => (
              <div key={key.categoryId} className="flex space-between border-top border-1 py-1 mx-3 categories">
                <p className="fs-2 dm-text mx-3 raleway">{key.catName}</p>
              </div>
                ))
          }
          </div>
        </div>
      </div>
    );
  }
}
