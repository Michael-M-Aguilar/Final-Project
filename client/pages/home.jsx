import React from 'react';
// import Header from './header';
import Body from './body';

export default class Home extends React.Component {

  // handleClick(e) {
  //   if (e.target.className === 'fas fa-plus-circle') {
  //     this.setState(!isSatisfied);
  //   }
  // }

  // componentDidMount() {
  //   this.getTodos();
  // }

  // getTodos() {
  //   fetch('api/entries')
  //     .then(res => res.json())
  //     .then(info => {
  //       console.log(info);
  //       this.setState({ info: info });
  //     });
  // }

  render() {
    // console.log('State:', this.state);
    return (
      <div className="container">
        <Body />
     </div>
    );
  }
}
