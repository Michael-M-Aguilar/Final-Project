import React from 'react';
import PieChart from './pie-chart';

export default class SpendingChart extends React.Component {
  render() {
    return (
      // <div className="container ctcontainer desktopBody my-4">
      //   <div>
      //     <h1 className="fs-2 text-header dmTextColor">Spending Chart </h1>
      //   </div>
      //   <div className="height flex flex-column border border-5 border-dark rounded desktopSecondary">
      //   </div>
      // </div>
      <div className="container">
      <PieChart />
      </div>
    );
  }
}
