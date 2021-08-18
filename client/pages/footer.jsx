import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="">
        <div className="flex justify-content-start footer hidden-in-desktop">
          <a href="#transactions">
            <span className="logo-icon transaction-p px-5 mt-2"><i className="fas fa-list fa-2x"></i></span>
          </a>
          <a href="#folder">
            <span className="logo-icon px-5"><i className="fas fa-folder-open fa-2x"></i></span>
          </a>
          <a href="#">
            <span className="logo-icon px-5" ><i className="fas fa-home fa-2x"></i></span>
          </a>
          <a href="#spending-chart">
            <span className="logo-icon px-5"><i className="fas fa-chart-pie fa-2x"></i></span>
          </a>
        </div>
      </div>
    );
  }
}
