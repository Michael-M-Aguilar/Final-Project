import React from 'react';
import moment from 'moment';
import PieChart from './pie-chart';

export default class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      transaction: '',
      budget: '',
      budgetInput: '',
      debit: ''
    };
    this.getEntries = this.getEntries.bind(this);
    this.getBudget = this.getBudget.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.totalExpense = this.totalExpense.bind(this);
    this.totalCredit = this.totalCredit.bind(this);
    this.getAccount = this.getAccount.bind(this);
  }

  // If component is mounted, this is to start these methods after my render
  componentDidMount() {
    this.getEntries();
    this.getBudget();
    this.getTransactions();
    this.getAccount();
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

  getAccount() {
    fetch('/api/account')
      .then(res => res.json())
      .then(debit => {
        this.setState({ debit: debit });
        this.totalCredit();
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
    return (
      <div className="container hiddenInMobile desktopBody my-4">
        <div className="flex space-between">
          <div>
            <p className="fs-1 dmTextColor text-header">Accounts</p>
          </div>
        </div>
        <div className="flex space-evenly pt-4">
          <div className="align-self-c desktopSecondary border border-dark border-3 rounded col-sm-4 flex justify-content-center">
            <button type="button" id="budgetBtn" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" >
              <p className="fs-4 text-center dmTextColor text-header my-2">{(!this.state.budget.length) ? 'Please Insert a Budget' : 'Budget: $' + this.state.budget[0].amount}</p>
            </button>
          </div>
          <div className="space-evenly desktopSecondary border border-dark border-3 rounded col">
            <p className="fs-4 text-center text-header my-3 mx-3 dmTextColor">Expense: <span className="dmNegativeColor numbers">{(!transaction.length) ? '...' : '$' + this.totalExpense()}</span></p>
          </div>
          <div className="space-evenly desktopSecondary border border-dark border-3 rounded col">
            <p className="fs-4 text-center text-header my-3 mx-3 dmTextColor">Income: <span className="dmPositiveColor numbers">{(!debit.length) ? '...' : '$' + this.totalCredit()}</span></p>
          </div>
        </div>
        <div className="row3 flex pt-5">
          <div className="desktopSecondary recentTW py-4 border border-dark border-4 col col-sm-6">
            <p className="fs-3 dmTextColor text-header mx-2">Recent Transactions: </p>
            {
                (!this.state.info.length)
                  ? <p className="text-header mx-2 dmTextColor">Insert an entry using the plus sign on the bottom right!</p>
                  : info.slice(0, 4).map(key => (
                    <div key={key.entryId} className="flex space-between border-top border-2 py-1 mx-1 my-1 rt">
                      <p className="mx-2 fs-5 dmTextColor raleway my-3">{(!key) ? '...' : key.note}</p>
                      <div className="flex flex-column mx-1">
                        <p className={(!key) ? '...' : (key.amount[0] === '-') ? 'fs-5 dmTextColor numbers dmNegativeColor numbers text-end my-3' : 'fs-5 dmTextColor numbers dmPositiveColor numbers text-end my-3'}>{(!key) ? 'Loading ...' : '$ ' + key.amount}</p>
                        <p className="fs-5 dmTextColor raleway my-1">{(!key) ? '...' : moment(key.date).format('MMMM Do YYYY')}</p>
                      </div>
                    </div>
                  ))
            }
              <div className="border-top flex justify-content-end border-2 py-1">
                <a href="#transactions">
                  <p className="fs-3 dmTextColor text-header my-4 mx-4">View All </p>
                </a>
              </div>
          </div>
          <div className="desktopSecondary spendingC flex flex-column border border-dark border-4 py-1 col">
            <PieChart />
            <div className="flex justify-content-end border-2 pt-4 mx-5">
              <a href="#spending-chart">
                <p className="fs-3 dmTextColor text-header mb-3">View More </p>
              </a>
            </div>
          </div>
        </div>
        {/* If pressing the + Button, sends user to create a transaction */}
        <div className="logoIcon flex justify-content-end ">
          <a href="#create-transaction">
            <i className="fas fa-plus-circle fa-6x my-5 logoIcon"></i>
          </a>
        </div>
        {/* Modal to pop up when inserting a budget. */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-header dmTextColor" id="exampleModalLabel">Set a New Budget:</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="flex justify-content-center">
                  <label htmlFor="budget" className="form-label raleway dmTextColor"></label>
                  <input type="number" min="0" step="0.01" id="budgetInput" name="budgetInput" className=" fs-5 form-control inputBackground numbers dmTextColor border-4 border-dark" onChange={this.handleChange}></input>
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
