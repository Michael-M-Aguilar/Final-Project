import React from 'react';
import Home from './pages/home';
import Header from './pages/header';
import CreateTransaction from './pages/create-transaction';
import CreateCredit from './pages/create-credit';
import CreateDebit from './pages/create-debit';
import ParseRoute from '../server/parse-route';
import NotFound from './pages/not-found';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: ParseRoute(window.location.hash),
      entries: []
    };
    // this.addEntry = this.addEntry.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: ParseRoute(window.location.hash) });
    });

    fetch('/api/entries')
      .then(res => res.json())
      .then(data => {
        this.setState({
          entries: data
        });
      });
  }

  // addEntry(newEntry) {
  //   fetch('/api/entries', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(newEntry)
  //   })
  //     .then(res => res.json())
  //   .then(data => {
  //     this.setState({
  //       entries: this.state.entries.
  //     });
  //   });

  // }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'create-transaction') {
      return <CreateTransaction />;
    }
    if (route.path === 'create-transaction/credit') {
      return <CreateCredit />;
    }
    if (route.path === 'create-transaction/debit') {
      return <CreateDebit />;
    }
    return <NotFound />;
  }

  render() {
    return (
      <>
        <Header />
        {this.renderPage()}
      </>
    );
  }
}
