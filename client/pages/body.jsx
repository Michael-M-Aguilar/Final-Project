import React from 'react';

export default class Body extends React.Component {
  render() {
    return (
      <div className="container hiddenInMobile desktopBody my-4">
        <div className="row1 flex space-between">
          <div>
            <p className="fs-1 dmTextColor text-header">Accounts</p>
          </div>
          <div>
            <p className="fs-1 dmTextColor text-header">July (Current Month)</p>
          </div>
        </div>
        <div className="row2 flex space-evenly pt-4">
          <div className="space-evenly desktopSecondary border border-dark border-3 rounded">
            <p className="fs-3 text-center dmTextColor text-header my-3 mx-3">Budget: <span className="numbers">$5000.00</span></p>
         </div>
          <div className="space-evenly desktopSecondary border border-dark border-3 rounded">
            <p className="fs-3 text-center text-header my-3 mx-3 dmTextColor">Income: <span className="dmPositiveColor numbers">$358.14</span></p>
         </div>
          <div className="space-evenly desktopSecondary border border-dark border-3 rounded">
            <p className="fs-3 text-center text-header my-3 mx-3 dmTextColor">Transactions: <span className="dmNegativeColor numbers">$400.66</span></p>
         </div>
        </div>
        <div className="row3 flex space-evenly pt-5">
          <div className="desktopSecondary recentTW py-4 border border-dark border-4">
            <p className="fs-3 dmTextColor text-header mx-3">Recent Transactions: </p>
            <div className="flex space-between border-top border-2 py-2 mx-3">
              <p className="fs-5 dmTextColor mx-3 raleway"> Jordan 4 Oreo Whites</p>
              <div className="flex flex-column mx-3">
                <p className="fs-5 dmTextColor numbers dmNegativeColor numbers">-$209.50</p>
                <p className="fs-5 dmTextColor raleway">July 16, 2021</p>
              </div>
            </div>
            <div className="flex space-between border-top border-2 py-2 mx-3">
              <p className="fs-5 dmTextColor mx-3 raleway"> Nike Store</p>
              <div className="flex flex-column mx-3">
                <p className="fs-5 dmTextColor numbers dmNegativeColor numbers">-$56.18</p>
                <p className="fs-5 dmTextColor raleway">July 15, 2021</p>
              </div>
            </div>
            <div className="flex space-between border-top border-2 py-2 mx-3">
              <p className="fs-5 dmTextColor mx-3 raleway"> Din Tai Fung </p>
              <div className="flex flex-column mx-3">
                <p className="fs-5 dmTextColor numbers dmNegativeColor numbers">-$134.98</p>
                <p className="fs-5 dmTextColor raleway">July 13, 2021</p>
              </div>
            </div>
            <div className="flex space-between border-top border-2 py-2 mx-3">
              <p className="fs-5 dmTextColor mx-3 raleway"> Sold Oreos </p>
              <div className="flex flex-column mx-3">
                <p className="fs-5 dmTextColor numbers dmPositiveColor numbers">+$358.14</p>
                <p className="fs-5 dmTextColor raleway">July 10, 2021</p>
              </div>
            </div>
            <div className="border-top flex justify-content-end border-2 py-3 mx-3">
              <p className="fs-3 dmTextColor text-header">View All </p>
           </div>
          </div>
          <div className="desktopSecondary spendingC flex flex-column border border-dark border-4 py-2">
            <p className="fs-3 dmTextColor text-header mx-3 my-3">Spending Chart: </p>
            <img className="mx-5" src="/images/pie.png" alt="Pie Chart" />
            <div className="flex justify-content-end border-2 pt-4 mx-5">
              <p className="fs-3 dmTextColor text-header">View More </p>
           </div>
          </div>
        </div>
        <div className="logoIcon flex justify-content-end ">
          <a href="#create-transaction">
            <i className="fas fa-plus-circle fa-6x my-5"></i>
          </a>
        </div>
      </div>
    );
  }
}
