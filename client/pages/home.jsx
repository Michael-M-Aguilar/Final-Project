import React from 'react';

export default class DesktopView extends React.Component {
  render() {
    return (
      <div className="flex space-between">
        <div>
          Logo
          {/* <img src={LogoDM}/> */}
        </div>
        <div className="flex flex-column-reverse">
          <div className="flex space-evenly">
            <div>Home</div>
            <div>Transactions</div>
            <div>Folder</div>
            <div>Chart</div>
            <div>Settings</div>
          </div>
          <div className="flex space-evenly">
            <span className="logoIcon"><i className="fas fa-home fa-2x"></i></span>
            <span className="logoIcon"><i className="fas fa-list fa-2x"></i></span>
            <span className="logoIcon"><i className="fas fa-folder-open fa-2x"></i></span>
            <span className="logoIcon"><i className="fas fa-chart-pie fa-2x"></i></span>
            <span className="logoIcon"><i className="fas fa-cog fa-2x"></i></span>
          </div>
        </div>
      </div>
    );
  }
}
