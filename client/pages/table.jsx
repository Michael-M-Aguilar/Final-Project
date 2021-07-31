import React from 'react';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      loading: true,
      total: ''
    };
    this.getChart = this.getChart.bind(this);
    this.letsReduce = this.letsReduce.bind(this);
  }

  componentDidMount() {
    this.getChart();
  }

  getChart() {
    fetch('/api/chart')
      .then(res => res.json())
      .then(transaction => {
        this.setState({ transaction: transaction });
        this.letsReduce();
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

  render() {
    if (this.state.loading) {
      return <p>This is loading..</p>;
    } else {
      const { info } = this.state;
      const dataArray = [];
      for (const key in info) {
        const newobj = {
          [key]: info[key]
        };
        dataArray.push(newobj);
      }
      // console.log(dataArray);
      return (
      <div className="desktopSecondary flex flex-column pt-3 border-top border-1">
        <table className="table">
          <caption scope="row" className="dmTextColor raleway mx-3">List of Expenses</caption>
          <thead className="dmTextColor">
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Total</th>
              <th scope="col">%</th>
            </tr>
          </thead>
          <tbody className="dmTextColor raleway mx-3">
          {
            (!info.length)
              ? dataArray.map(item => {
                const data = Object.keys(item)[0];
                return (
                  <tr key={item[data]}>
                    <td>{data}</td>
                    <td>{item[data]}</td>
                    <td>HELLO</td>
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
