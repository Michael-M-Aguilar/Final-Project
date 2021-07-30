import React from 'react';
import { Pie } from 'react-chartjs-3';

// defaults.global.legend.position = 'bottom';

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: [],
      loading: true
      // transactions: []
    };
    this.getEntries = this.getEntries.bind(this);
    this.letsReduce = this.letsReduce.bind(this);
  }

  componentDidMount() {
    this.getEntries();
    // this.totalAccumulator();
  }

  getEntries() {
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
    // console.log('Totals:', totals);
  }

  render() {
    // console.log(this.state);
    // const { transaction } = this.state;
    // const { transactions } = this.state;
    // console.log('Value of Transaction:', transaction);
    // return (
    if (this.state.loading) {
      return <p>This is loading</p>;
    } else {
      // var list = []
      // for(category in this.state.transactions){
      //   list.push({category.catName: category.amount})
      // }
      return (
      <div>
        {/* {
          (!transaction.length)
            ? ''
            : this.totalAccumulator()
        } */}
        {/* <p>{this.letsReduce()}</p> */}
        <h2 className="dmTextColor">Spending Chart:</h2>
        <div className="desktopSecondary flex flex-column">
        <Pie
          data={{
            // labels: [{Bills: 156}, {Food: 300}, ],
            labels: ['Red', 'Blue', 'Yellow', 'Green'],
            datasets: [
              {
                data: [12, 19, 12, 6, 2],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 3
              }
            ]
          }}
        height={50}
        width={50}
        options={{
          maintainAspectRatio: false,
          // parsing: false,
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
    // );
  }
}
