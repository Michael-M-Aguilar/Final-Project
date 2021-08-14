import React from 'react';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // State to store for table rendering
      info: [],
      loading: true,
      // State to help reduce for categoryName: amount
      total: '',
      // State to help calculate expense total
      expenseTotal: ''
    };
    this.letsReduce = this.letsReduce.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
  }

  componentDidMount() {
    this.getTransactions();
  }

  // Fetch chart data (amount, catName)
  getTransactions() {
    fetch('/api/chart')
      .then(res => res.json())
      .then(transaction => {
        this.setState({ transaction: transaction });
        this.setState({ expenseTotal: transaction });
        this.letsReduce();
      });
  }

  // Helps us have our data to be CategoryName: Total for Category
  letsReduce() {
    const { transaction } = this.state;
    const totals = transaction.reduce((totals, item) => {
      const catName = item.catName;
      const amount = Math.abs(item.amount);
      if (!totals[catName]) {
        totals[catName] = 0;
      }
      totals[catName] += amount;
      return totals;
    }, {});
    const { expenseTotal } = this.state;
    const total = expenseTotal.reduce((a, b) => ({ amount: Math.abs(a.amount) + Math.abs(b.amount) }));
    this.setState({ info: totals });
    this.setState({ expenseTotal: total });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <p>This is loading..</p>;
    } else {
      const { info } = this.state;
      const { expenseTotal } = this.state;
      const dataArray = [];
      for (const key in info) {
        const newobj = {
          [key]: info[key]
        };
        dataArray.push(newobj);
      }
      return (
      <div className="desktop-secondary flex flex-column pt-3 border-top border-1">
        <table className="table">
          <caption scope="row" className="dm-text raleway mx-3">List of Expenses</caption>
          <thead className="dm-text">
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Total</th>
              <th scope="col">%</th>
            </tr>
          </thead>
          <tbody className="dm-text raleway mx-3">
          {
            (!info.length)
              ? dataArray.map(item => {
                const data = Object.keys(item)[0];
                return (
                  <tr key={item[data]}>
                    <td className="raleway">{data}</td>
                    <td className="numbers">$ {item[data]}</td>
                    <td className="numbers">{Math.round((item[data]) / expenseTotal.amount * 100)}</td>
                  </tr>
                );
              })
              : ''
          }
          </tbody>
        </table>
      </div>
      );
    }
  }
}
