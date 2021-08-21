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
    this.deleteCategories = this.deleteCategories.bind(this);
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
    })
      .then(() => {
        this.getCategories();
      })
      .catch(err => {
        console.error(err);
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
              <div key={key.categoryId} className="border-top border-1 py-1 mx-3 categories flex">
                <p className="fs-2 dm-text mx-3 raleway">{key.catName}</p>
                <button type="button" className="delete-but text-center dm-text raleway" data-bs-toggle="modal" data-bs-target="#deleteCat">Delete</button>
                  <div className="modal fade" id="deleteCat" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title text-header dm-text" id="exampleModalLabel">Are you sure you want to delete this transaction?</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer flex justify-content-between">
                          <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                          <button type="button" id={key.categoryId} className="btn btn-dark rounded mx-4" data-bs-dismiss="modal" onClick={this.deleteCategories}>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
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
