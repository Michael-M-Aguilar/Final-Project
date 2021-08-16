import React from 'react';
import PieChart from './pie-chart';
import Table from './table';

export default class SpendingChart extends React.Component {
  render() {
    return (
      <div className="container desktop-body my-3">
        <h2 className="dm-text">Spending Chart:</h2>
        <div className="border border-5 border-dark rounded my-3 mx-2">
          <PieChart />
          <Table />
        </div>
      </div>
    );
  }
}
