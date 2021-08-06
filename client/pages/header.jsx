import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="">
        <div className="flex space-between">
          <div className="col col-sm-4 col-md-4">
            <img className="logoSize pt-3" src="/images/logo.png" alt="LogoDM" />
          </div>
          <div className="flex flex-column header-width py-4 col col-sm-8 col-md-8">
            <div className="flex justify-content-between align-items-center">
              <a href="#" className="items-center">
                  <span className="logoIcon ps-1" ><i className="fas fa-home fa-3x"></i></span>
                  <div className="dmTextColor text-style-heading fs-4">Home</div>
              </a>
              <a href="#transactions">
                <span className="logoIcon transaction-p"><i className="fas fa-list fa-3x"></i></span>
                <div className="dmTextColor text-style-heading fs-4">Transactions</div>
              </a>
              <a href="#folder">
                <span className="logoIcon ps-1"><i className="fas fa-folder-open fa-3x"></i></span>
                <div className="dmTextColor text-style-heading fs-4">Folder</div>
              </a>
              <a href="#spending-chart">
                <span className="logoIcon ps-1"><i className="fas fa-chart-pie fa-3x"></i></span>
                <div className="dmTextColor text-style-heading fs-4">Chart</div>
              </a>
              <a>
                <span className="logoIcon ps-3"><i className="fas fa-cog fa-3x"></i></span>
                <div className="dmTextColor text-style-heading fs-4">Settings</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
