import React from 'react';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      loading: true
    };
    this.getChart = this.getChart.bind(this);
    this.letsReduce = this.letsReduce.bind(this);
    this.letsMap = this.letsMap.bind(this);
  }

  componentDidMount() {
    this.getChart();
    this.letsMap();
  }

  getChart() {
    fetch('/api/chart')
      .then(res => res.json())
      .then(transaction => {
        this.setState({ transaction: transaction });
        this.letsReduce();
        this.letsMap();
      });
  }

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
    this.setState({ info: totals });
    this.setState({ loading: false });
  }

  letsMap() {
    const { info } = this.state;
    const dataArray = [];
    for (const key in info) {
      const newobj = {
        [key]: info[key]
      };
      dataArray.push(newobj);
    }

    dataArray.map(item => {
      const key = Object.keys(item)[0];
      return (
        <tr key={key[info]}>
          <td>{key}</td>
          <td>{item[key]}</td>
        </tr>
      );
    });
  }

  render() {
    if (this.state.loading) {
      return <p>This is loading..</p>;
    } else {
      return (
      <div className="desktopSecondary flex flex-column pt-3 border-top border-1">
        <table className="table">
          <caption scope="row" className="dmTextColor raleway mx-3">List of Expenses</caption>
          <thead className="dmTextColor">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category</th>
              <th scope="col">Total</th>
              <th scope="col">%</th>
            </tr>
          </thead>
          <tbody className="dmTextColor raleway mx-3">
          {this.letsMap()}
          </tbody>
        </table>
      </div>
      );
    }
  }
}
