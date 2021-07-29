import React from 'react';
import { Pie } from 'react-chartjs-3';

export default class PieChart extends React.Component {
  render() {
    return (
      <div className="container">
        <h2 className="dmTextColor">Pie Example</h2>
        <Pie
          data={{
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
              {
                label: 'Spending',
                data: [12, 19, 3, 5, 2, 3],
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
                ]
              }
            ]
          }}
        height={50}
        width={50}
        options={{
          maintainAspectRatio: false
        }} />
      </div>
    );
  }
}
