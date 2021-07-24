import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="flex space-between hiddenInMobile">
          <div>
            <a href="#">
              <img className="logoSize pt-3" src="/images/logo-dm.png" alt="LogoDM" />
            </a>
          </div>
          <div className="flex header-width py-3">
            <div className="flex justify-content-between">
              <a href="#">
                <div>
                  <span className="logoIcon" ><i className="fas fa-home fa-2x"></i></span>
                  <div className="dmTextColor text-style-heading">Home</div>
                </div>
              </a>
              <div>
                <span className="logoIcon"><i className="fas fa-list fa-2x"></i></span>
                <div className="dmTextColor text-style-heading">Transactions</div>
              </div>
              <div>
                <span className="logoIcon"><i className="fas fa-folder-open fa-2x"></i></span>
                <div className="dmTextColor text-style-heading">Folder</div>
              </div>
              <div>
                <span className="logoIcon"><i className="fas fa-chart-pie fa-2x"></i></span>
                <div className="dmTextColor text-style-heading">Chart</div>
              </div>
              <div>
                <span className="logoIcon"><i className="fas fa-cog fa-2x"></i></span>
                <div className="dmTextColor text-style-heading">Settings</div>
              </div>
            </div>
            {/* <div className="flex justify-content-around ">
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
