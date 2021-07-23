import React from 'react';

export default class Body extends React.Component {
  render() {
    return (
      <div className="container hiddenInMobile desktopBody my-4">
        <div className="row1 flex space-between">
          <div>
            <h1 className="dmTextColor text-header">Accounts</h1>
          </div>
          <div>
            <h1 className="dmTextColor text-header">July (Current Month)</h1>
          </div>
        </div>
        <div className="row2 flex space-evenly pt-4">
          <div className="space-evenly desktopSecondary border border-dark border-3 rounded">
            <h3 className="text-center dmTextColor text-header my-3 mx-3">Budget: $5000.00</h3>
          </div>
          <div className="space-evenly desktopSecondary border border-dark border-3 rounded">
            <h3 className="text-center text-header my-3 mx-3 dmPositiveColor">Income: $500.00</h3>
          </div>
          <div className="space-evenly desktopSecondary border border-dark border-3 rounded">
            <h3 className="text-center text-header my-3 mx-3 dmNegativeColor">Transactions: $400.00 </h3>
          </div>
        </div>
        <div className="row3 flex space-evenly pt-5">
          <div className="desktopSecondary recentTW py-4">
            <h4 className="dmTextColor text-header mx-3">Recent Transactions: </h4>
            <div className="flex space-between border-top border-2 py-2 mx-3">
              <p className="dmTextColor mx-3 raleway"> Jordan 4 Oreo Whites</p>
              <div className="flex flex-column mx-3">
                <p className="dmTextColor raleway dmNegativeColor">-$209.50</p>
                <p className="dmTextColor raleway">July 16, 2021</p>
              </div>
            </div>
            <div className="flex space-between border-top border-2 py-2 mx-3">
              <p className="dmTextColor mx-3 raleway"> Nike Store</p>
              <div className="flex flex-column mx-3">
                <p className="dmTextColor raleway dmNegativeColor">-$56.18</p>
                <p className="dmTextColor raleway">July 15, 2021</p>
              </div>
            </div>
            <div className="flex space-between border-top border-2 py-2 mx-3">
              <p className="dmTextColor mx-3 raleway"> Din Tai Fung </p>
              <div className="flex flex-column mx-3">
                <p className="dmTextColor raleway dmNegativeColor">-$134.98</p>
                <p className="dmTextColor raleway">July 13, 2021</p>
              </div>
            </div>
            <div className="flex space-between border-top border-2 py-2 mx-3">
              <p className="dmTextColor mx-3 raleway"> Sold Oreos </p>
              <div className="flex flex-column mx-3">
                <p className="dmTextColor raleway dmPositiveColor ">+$358.14</p>
                <p className="dmTextColor raleway">July 10, 2021</p>
              </div>
            </div>
            <div className="border-top flex justify-content-end border-2 py-3 mx-3">
              <h3 className="dmTextColor text-header">View All </h3>
            </div>
          </div>
          <div className="desktopSecondary spendingC flex flex-column">
            <h4 className="dmTextColor text-header mx-3 my-3">Spending Chart: </h4>
            <img className="mx-5" src="/images/pie.png" alt="Pie Chart" />
            <div className="flex justify-content-end border-2 py-5 mx-5">
              <h3 className="dmTextColor text-header">View More </h3>
            </div>
          </div>
        </div>
        <div className="logoIcon flex justify-content-end ">
          <i className="fas fa-plus-circle fa-6x my-5"></i>
        </div>
      </div>
    );
  }
}
