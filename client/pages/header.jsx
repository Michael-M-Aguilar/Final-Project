import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="flex space-between hiddenInMobile">
          <div>
            Logo
            {/* <img src={LogoDM}/> */}
          </div>
          <div className="flex flex-column-reverse header-width">
            <div className="flex space-evenly">
              <div className="dmTextColor text-style-heading padding-right-med ">Home</div>
              <div className="dmTextColor text-style-heading padding-right-med">Transactions</div>
              <div className="dmTextColor text-style-heading padding-right-med">Folder</div>
              <div className="dmTextColor text-style-heading padding-right-med">Chart</div>
              <div className="dmTextColor text-style-heading padding-right-med">Settings</div>
            </div>
            <div className="flex space-around ">
              <span className="logoIcon padding-right-meds" ><i className="fas fa-home fa-2x"></i></span>
              <span className="logoIcon padding-right-med"><i className="fas fa-list fa-2x"></i></span>
              <span className="logoIcon padding-right-sm"><i className="fas fa-folder-open fa-2x"></i></span>
              <span className="logoIcon padding-right-sm"><i className="fas fa-chart-pie fa-2x"></i></span>
              <span className="logoIcon padding-right-med"><i className="fas fa-cog fa-2x"></i></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
