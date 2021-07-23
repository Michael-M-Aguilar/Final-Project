import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="flex space-between hiddenInMobile">
          <div>
            <a href="#">
              <img className="logoSize py-3" src="/images/logo-dm.png" alt="LogoDM" />
            </a>
          </div>
          <div className="flex flex-column-reverse header-width py-3">
            <div className="flex justify-content-evenly">
              <div className="dmTextColor text-style-heading py-2">Home</div>
              <div className="dmTextColor text-style-heading py-2 ">Transactions</div>
              <div className="dmTextColor text-style-heading py-2">Folder</div>
              <div className="dmTextColor text-style-heading py-2">Chart</div>
              <div className="dmTextColor text-style-heading py-2">Settings</div>
            </div>
            <div className="flex justify-content-around ">
              <span className="logoIcon" ><i className="fas fa-home fa-2x"></i></span>
              <span className="logoIcon"><i className="fas fa-list fa-2x"></i></span>
              <span className="logoIcon"><i className="fas fa-folder-open fa-2x"></i></span>
              <span className="logoIcon"><i className="fas fa-chart-pie fa-2x"></i></span>
              <span className="logoIcon"><i className="fas fa-cog fa-2x"></i></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
