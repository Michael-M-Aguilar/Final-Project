import React from 'react';
import CreditEntry from '../components/credit-comp';

export default class CreateDebit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      date: '',
      note: ''
    };
    this.todaysDate = this.todaysDate.bind(this);
  }

  todaysDate() {
    document.getElementById('date').valueAsDate = new Date();
    // eslint-disable-next-line no-undef
    const today = format('YYYY-MM-DD');
    document.getElementById('date').value = today;
  }

  render() {
    return (
      <div className="container create-body">
        <div>
          <h1 className="text-header dm-text">Creating New Debit Transaction: </h1>
        </div>
        <div className="flex flex-column border border-5 border-dark rounded cd-position desktop-secondary">
          <div className="flex justify-content-start">
            <a href="#create-transaction">
              <i className="fas fa-times-circle fa-3x mx-3 my-4 logo-icon"></i>
            </a>
          </div>
          <CreditEntry />
        </div>
      </div>
    );
  }
}
