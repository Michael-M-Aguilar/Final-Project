import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="flex justify-content-between header-width py-4 col col-sm-8 col-md-8">
          <a href="#transactions">
            <span className="logoIcon transaction-p"><i className="fas fa-list fa-3x"></i></span>
          </a>
          <a href="#folder">
            <span className="logoIcon ps-4"><i className="fas fa-folder-open fa-3x"></i></span>
          </a>
          <a href="#" className="items-center">
            <span className="logoIcon ps-1" ><i className="fas fa-home fa-3x"></i></span>
          </a>
          <a href="#spending-chart">
            <span className="logoIcon ps-1"><i className="fas fa-chart-pie fa-3x"></i></span>
          </a>
          <a>
            <span className="logoIcon ps-3"><i className="fas fa-cog fa-3x"></i></span>
          </a>
        </div>
      </div>
    );
  }
}
