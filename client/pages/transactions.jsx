import React from 'react';
import moment from 'moment';
export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
    // array to hold our entries to present on the page.
    this.state = {
      info: [],
      infos: '',
      entryId: ''
    };
    this.getEntries = this.getEntries.bind(this);
    this.deleteEntries = this.deleteEntries.bind(this);
  }

  // If component is mounted, this is to start getEntries method
  componentDidMount() {
    this.getEntries();
  }

  // our get request to present information on the page
  getEntries() {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(data => {
        this.setState({ infos: data });
      });
  }

  deleteEntries(event) {
    const trial = event.target.id;
    const entryId = parseInt(trial);
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
    return (
      <div className="container desktop-body overflow">
        <div className="mx-2 ">
          <h1 className="text-header dm-text">List of all Transactions:</h1>
        </div>
        <div className="border border-5 border-dark rounded transaction-history desktop-secondary">
          <div className="">
            <p className="text-header dm-text mx-4 fs-3">Transactions</p>
          </div>
        {
          (!this.state.infos.length)
            ? 'Loading...'
            : infos.map(key => (
            <div key={key.entryId} entryid={key.entryId} className="flex space-between border-top border-2 py-2 mx-3">
              <div className="flex flex-column">
                <p className="fs-5 dm-text mx-3 raleway">{key.note}</p>
                <p className="fs-5 dm-text mx-3 raleway">{(!key.location) ? '' : 'Location: ' + key.location}</p>
              </div>
              <div className="flex flex-row mx-3">
                <div className="mx-4">
                  <button id={key.entryId} entryid={key.entryId} onClick={this.deleteEntries} className="delete-but">
                    <p className="my-1 raleway"id={key.entryId}>Delete</p>
                  </button>
                </div>
                <div className="mx-4">
                  <p className={(!this.state.infos.length) ? 'Loading...' : (key.amount[0] === '-') ? 'fs-5 dm-text dm-negative numbers text-end ' : 'fs-5 dm-text dm-positive numbers text-end'}>$ {key.amount}</p>
                  <p className="fs-5 dm-text raleway text-end">{moment(key.date).format('MMMM Do YYYY')}</p>
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
