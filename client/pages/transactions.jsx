import React from 'react';
import moment from 'moment';
import Spinner from '../components/spinner';
import UpdateEntry from '../components/update-entry';

export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      infos: '',
      loading: true
    };

    this.getEntries = this.getEntries.bind(this);
    this.deleteEntries = this.deleteEntries.bind(this);
    this.saveId = this.saveId.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  handleMouseEnter() {
    console.log('');
  }

  componentDidMount() {
    this.getEntries();
  }

  getEntries() {
    fetch('/api/transaction')
      .then(res => res.json())
      .then(data => {
        this.setState({ infos: data });
        this.setState({ loading: false });
      });
  }

  saveId() {
    this.setState({ entryId: event.target.id });
  }

  deleteEntries(event) {
    const { entryId } = this.state;
    fetch('/api/entries/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entryId })
    })
      .then(() => {
        this.getEntries();
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { infos } = this.state;
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return (
      <div className="container create-body overflow">
        <div className="mx-2 ">
          <h1 className="text-header dm-text">List of all Transactions:</h1>
        </div>
        <div className="border border-5 border-dark rounded transaction-history desktop-secondary">
          <div className="">
            <p className="text-header dm-text mx-2 fs-3">Transactions</p>
          </div>
        {
          (!this.state.infos.length)
            ? ''
            : infos.map(key => (
            <div key={key.entryId} entryid={key.entryId} onMouseEnter={this.handleMouseEnter} className="transactions flex space-between border-top border-2">
              <div className="flex flex-column">
                <p className="fs-5 dm-text mx-2 raleway">{key.note}</p>
                <p className="fs-5 dm-text mx-2 raleway">Category: {key.catName}</p>
                <p className="fs-5 dm-text mx-2 raleway">{(!key.location) ? null : 'Location: ' + key.location}</p>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-column">
                    <button type="button" id={key.entryId} className="delete-but text-center dm-text raleway my-3" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={this.saveId}>
                    Update
                  </button>
                  <button type="button" id={key.entryId} className="delete-but text-center dm-text raleway my-3" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={this.saveId}>
                    Delete
                  </button>
                </div>
                <div className="mx-2">
                  <p className={(!this.state.infos.length) ? 'Loading...' : (key.amount[0] === '-') ? 'fs-5 dm-text dm-negative numbers text-end ' : 'fs-5 dm-text dm-positive numbers text-end'}>$ {key.amount}</p>
                  <p className="fs-5 dm-text raleway text-end">{moment(key.date).format('MMMM Do YYYY')}</p>
                </div>
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModal" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title text-header dm-text" id="exampleModalLabel">Are you sure you want to delete this transaction?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-footer flex justify-content-between">
                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                        <button type="button" id={key.entryId} className="btn btn-dark rounded mx-4" data-bs-dismiss="modal" onClick={this.deleteEntries}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModal" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <p className="modal-title text-header dm-text fs-3" id="exampleModalLabel">Updating Entry</p>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div>
                        <UpdateEntry />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ))
        }
        </div>
      </div>
      );
    }
  }
}
