import React from 'react';
import moment from 'moment';
export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
    // array to hold our entries to present on the page.
    this.state = {
      info: [],
      infos: ''
    };
    this.getEntries = this.getEntries.bind(this);
  }

  // If component is mounted, this is to start getEntries method
  componentDidMount() {
    this.getEntries();
  }

  // our get request to present information on the page
  getEntries() {
    fetch('api/transactions')
      .then(res => res.json())
      .then(data => {
        this.setState({ infos: data });
      });
  }

  render() {
    const { infos } = this.state;
    return (
      <div className="container ctcontainer desktopBody my-3">
        <div className="my-3 mx-2">
          <h1 className="text-header dmTextColor">List of all Transactions</h1>
        </div>
        <div className="flex overflow flex-column border border-5 border-dark rounded transactionHistory desktopSecondary mx-1 my-3">
          <div className="flex justify-content-between">
            <p className="text-header dmTextColor mx-4">Transaction</p>
            <p className="text-header fs-1 dmTextColor mx-4">July (Current Month)</p>
          </div>
        {
          (!this.state.infos.length)
            ? '...'
            : infos.map(key => (
            <div key={key.entryId} className="flex space-between border-top border-2 py-2 mx-3">
              <p className="fs-5 dmTextColor mx-3 raleway">{key.note}</p>
              <div className="flex flex-column mx-3">
                <p className={(!this.state.infos.length) ? 'Loading...' : (key.amount[0] === '-') ? 'fs-5 dmTextColor numbers dmNegativeColor numbers text-end ' : 'fs-5 dmTextColor numbers dmPositiveColor numbers text-end'}>$ {key.amount}</p>
                <p className="fs-5 dmTextColor raleway text-end">{moment(key.date).format('MMMM Do YYYY')}</p>
              </div>
            </div>
            ))
        }
        </div>
      </div>
    );
  }
}
