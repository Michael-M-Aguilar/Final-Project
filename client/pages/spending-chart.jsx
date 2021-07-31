import React from 'react';
import PieChart from './pie-chart';
import Table from './table';

export default class SpendingChart extends React.Component {
  render() {
    return (
      <div className="container">
        <h2 className="dmTextColor">Spending Chart:</h2>
        <div className="">
          <PieChart />
          <Table />
        </div>
      </div>
    );
  }
}
