import React from 'react';
import Spinner from '../components/spinner';

export default class Folders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      categories: '',
      loading: true
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
        this.setState({ loading: false });
      });
  }

  deleteCategories() {
    const trial = event.target.id;
    const categoryId = parseInt(trial);
    fetch('/api/categories/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoryId })
    });
  }

  render() {
    const { categories } = this.state;
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return (
      <div className="container desktop-body overflow">
        <div className="mx-2">
          <h1 className="text-header dm-text fs-1">List of Categories:</h1>
        </div>
        <div className="overflow border border-5 border-dark rounded desktop-secondary">
          <div className="flex justify-content-end mx-4" data-tooltip="Click to create a new category">
            <a href="#create-category">
              <i className="fas fa-plus-circle fa-5x my-4 logo-icon"></i>
            </a>
          </div>
          <div>
          {
              (!this.state.categories.length)
                ? '...'
                : categories.map(key => (
              <div key={key.categoryId} className="border-top border-1 py-1 mx-3 categories">
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
}
