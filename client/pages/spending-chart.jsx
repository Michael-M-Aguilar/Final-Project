import React from 'react';
import PieChart from './pie-chart';
import Table from './table';

export default class SpendingChart extends React.Component {
  render() {
    return (
      <div className="container desktop-body">
        <h2 className="dm-text">Spending Chart:</h2>
        <div className="">
          <PieChart />
          <Table />
        </div>
      </div>
    );
  }
}
