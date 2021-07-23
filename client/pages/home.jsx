import React from 'react';
import Header from './header';
import Body from './body';
import CreateTransaction from './create-transaction';
import CreateCredit from './create-credit';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: []
    };
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos() {
    fetch('api/entries')
      .then(res => res.json())
      .then(info => {
        // console.log(info);
        this.setState({ info: info });
      });
  }

  render() {
    // console.log('State:', this.state);
    return (
      <div className="container">
        <Header />
        {/* <h1 className='hiddenInDesktop'>this is just a header!</h1> */}
        <Body />
        <CreateTransaction />
        <CreateCredit />
     </div>
    );
  }
}
