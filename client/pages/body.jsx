import React from 'react';
import moment from 'moment';
import PieChart from '../components/pie-chart';
import Spinner from '../components/spinner';

export default class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      transaction: '',
      budget: '',
      budgetInput: '',
      debit: '',
      loading: true
    };
    this.getEntries = this.getEntries.bind(this);
    this.getBudget = this.getBudget.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.totalExpense = this.totalExpense.bind(this);
    this.totalCredit = this.totalCredit.bind(this);
    this.getDebit = this.getDebit.bind(this);
  }

  // If component is mounted, this is to start these methods after my render
  componentDidMount() {
    this.getEntries();
    this.getBudget();
    this.getTransactions();
    this.getDebit();
  }

  // our get request to present information on the page
  getEntries() {
    fetch('/api/entries')
      .then(res => res.json())
      .then(info => {
        this.setState({ info: info });
      });
  }

  totalExpense() {
    const { transaction } = this.state;
    const total = transaction.reduce((a, b) => ({ amount: Math.abs(a.amount) + Math.abs(b.amount) }));
    return Math.round(total.amount * 100) / 100;
  }

  totalCredit() {
    const { debit } = this.state;
    const total = debit.reduce((a, b) => ({ amount: Math.abs(a.amount) + Math.abs(b.amount) }));
    return Math.round(total.amount * 100) / 100;
  }

  // Fetch current budget set.
  getBudget() {
    fetch('/api/budget')
      .then(res => res.json())
      .then(budget => {
        this.setState({ budget: budget });
      });
  }

  getTransactions() {
    fetch('/api/chart')
      .then(res => res.json())
      .then(transaction => {
        this.setState({ transaction: transaction });
        this.totalExpense();
      });
  }

  getDebit() {
    fetch('/api/account')
      .then(res => res.json())
      .then(debit => {
        this.setState({ debit: debit });
        this.totalCredit();
        this.setState({ loading: false });
      });
  }

  // Keeping tracks of the update of the budget.
  handleChange(event) {
    if (event.target.id === 'budgetInput') {
      this.setState({
        budgetInput: event.target.value
      });
    }
  }

  // The submission of our budget.
  handleSubmit(event) {
    fetch('/api/budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ budget: this.state.budgetInput })
    })
      .then(res => res.json())
      .then(() => {
        this.getBudget();
      })
      .catch(err => {
        console.error(err);
      });
    event.preventDefault();
  }

  render() {
    const { info } = this.state;
    const { transaction } = this.state;
    const { debit } = this.state;
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return (
      <div className="container desktop-body">
        <div className="flex space-between">
          <div>
            <p className="fs-1 dm-text text-header">Dashboard</p>
          </div>
        </div>
        <div className="row">
          <div className="desktop-secondary border border-dark border-3 rounded col">
            <button type="button" id="budget-btn" className="btn" data-bs-toggle="modal" data-bs-target="#budgetModal" data-tooltip="Click to create a budget">
              <p className="fs-4 text-center dm-text text-header my-2">{(!this.state.budget.length) ? 'Please Insert a Budget' : 'Budget: $' + this.state.budget[0].amount}</p>
            </button>
          </div>
          <div className="desktop-secondary border border-dark border-3 rounded col">
            <p className="fs-4 text-center text-header my-3 mx-3 dm-text">Expense: <span className="dm-negative numbers">{(!transaction.length) ? '...' : '$' + this.totalExpense()}</span></p>
          </div>
          <div className="desktop-secondary border border-dark border-3 rounded col">
            <p className="fs-4 text-center text-header my-3 mx-3 dm-text">Income: <span className="dm-positive numbers">{(!debit.length) ? '...' : '$' + this.totalCredit()}</span></p>
          </div>
        </div>
        <div className="row pt-3">
          <div className="desktop-secondary pt-4 border border-dark border-3 col-md-6">
            <p className="fs-3 dm-text text-header mx-2">Recent Transactions: </p>
            {
                (!this.state.info.length)
                  ? <p className="text-header mx-2 dm-text">Insert an entry using the plus sign on the bottom right!</p>
                  : info.slice(0, 4).map(key => (
                    <div key={key.entryId} className="flex space-between border-top border-2 py-1 mx-1 my-1 rt">
                      <p className="mx-2 fs-5 dm-text raleway my-3">{(!key) ? '...' : key.note}</p>
                      <div className="flex flex-column mx-1">
                        <p className={(!key) ? '...' : (key.amount[0] === '-') ? 'fs-5 dm-text numbers dm-negative numbers text-end my-3' : 'fs-5 dm-text numbers dm-positive numbers text-end my-3'}>{(!key) ? 'Loading ...' : '$ ' + key.amount}</p>
                        <p className="fs-5 dm-text raleway my-1">{(!key) ? '...' : moment(key.date).format('MMMM Do YYYY')}</p>
                      </div>
                    </div>
                  ))
            }
              <div className="border-top flex justify-content-end border-2 py-1">
                <a href="#transactions" data-tooltip="Click to view all transactions">
                  <p className="fs-3 dm-text text-header my-4 mx-4">View All </p>
                </a>
              </div>
          </div>
          <div className="flex justify-content-between flex-column desktop-secondary border border-dark border-3 col-md-6">
            <div className="pt-4">
              <p className="fs-3 dm-text text-header">Spending Chart:</p>
              <PieChart />
            </div>
            <div className="flex justify-content-end border-2 mx-4" data-tooltip="Click to view more spending info">
              <a href="#spending-chart">
                <p className="fs-3 dm-text text-header">View More </p>
              </a>
            </div>
          </div>
        </div>
        <div className="logo-icon flex justify-content-end">
            <a href="#create-transaction" data-tooltip="Click to create an entry">
              <i className="fas fa-plus-circle fa-6x py-5 logo-icon"></i>
            </a>
        </div>
        <div className="modal fade" id="budgetModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-header dm-text" id="exampleModalLabel">Set a New Budget:</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="flex justify-content-center">
                  <label htmlFor="budget" className="form-label raleway dm-text"></label>
                  <input type="number" min="0" step="0.01" id="budgetInput" name="budgetInput" className=" fs-5 form-control input-background numbers dm-text" onChange={this.handleChange}></input>
                </div>
                <div className="modal-footer flex justify-content-between">
                  <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                  <button type="submit" id="submit" className="btn btn-dark rounded mx-4" onClick={this.justSubmitted}>Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      );
    }
  }
}
