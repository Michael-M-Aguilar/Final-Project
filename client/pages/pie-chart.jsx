import React from 'react';
import { Pie } from 'react-chartjs-3';

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: [],
      loading: true
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
    this.setState({ transactions: totals });
    this.setState({ loading: false });
  }

  render() {
    const { transactions } = this.state;
    if (this.state.loading) {
      return <p>This is loading..</p>;
    } else {
      const catList = [];
      const amountList = [];
      for (const key in transactions) {
        catList.push(key);
        amountList.push(transactions[key]);
      }
      return (
      <div>
        <div className="desktop-secondary flex flex-column pt-3 pb-4">
        <Pie
          data={{
            labels: catList,
            datasets: [
              {
                data: amountList,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(191, 191, 63, 0.6)',
                  'rgba(63, 191, 127, 0.6)',
                  'rgba(155, 237, 196, 0.6)',
                  'rgba(240, 213, 226, 0.6)',
                  'rgba(240, 226, 213, 0.6)',
                  'rgba(210, 136, 210, 0.6)',
                  'rgba(221, 194, 249, 0.6)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(191, 191, 63, 1)',
                  'rgba(63, 191, 127, 1)',
                  'rgba(155, 237, 196, 1)',
                  'rgba(240, 213, 226, 1)',
                  'rgba(240, 226, 213, 1)',
                  'rgba(210, 136, 210, 1)',
                  'rgba(221, 194, 249, 1)'
                ],
                borderWidth: 3
              }
            ]
          }}
        options={{
          maintainAspectRatio: false,
          legend: {
            labels: {
              fontSize: 12,
              fontColor: '#deedf0'
            }
          }
        }} />
        </div>
      </div>
      );
    }
  }
}
