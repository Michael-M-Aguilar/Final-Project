import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
        <div className="flex justify-content-between footer hidden-in-desktop">
          <a href="#transactions">
            <span className="logo-icon transaction-p"><i className="fas fa-list fa-2x sm-padding-t "></i></span>
          </a>
          <a href="#folder">
          <span className="logo-icon"><i className="fas fa-folder-open fa-2x sm-padding-t "></i></span>
          </a>
          <a href="#">
          <span className="logo-icon" ><i className="fas fa-home fa-2x sm-padding-t "></i></span>
          </a>
          <a href="#spending-chart">
          <span className="logo-icon"><i className="fas fa-chart-pie fa-2x sm-padding-t sm-padding-r"></i></span>
          </a>
        </div>
    );
  }
}
