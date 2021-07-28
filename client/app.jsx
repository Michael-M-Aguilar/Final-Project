import React from 'react';
import Home from './pages/home';
import Header from './pages/header';
import CreateTransaction from './pages/create-transaction';
import CreateCredit from './pages/create-credit';
import CreateDebit from './pages/create-debit';
import ParseRoute from '../server/parse-route';
import NotFound from './pages/not-found';
import Transactions from './pages/transactions';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: ParseRoute(window.location.hash),
      entries: []
    };
  }

  // Hash Routing
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

  renderPage() {
    const { route } = this.state;
    // If route.path is empty, send home
    if (route.path === '') {
      return <Home />;
    }
    // If route.path is equal to creating a transaction
    if (route.path === 'create-transaction') {
      return <CreateTransaction />;
    }
    // If route.path is equal to the credit page
    if (route.path === 'create-transaction/credit') {
      return <CreateCredit />;
    }
    // If route.path is equal to the debit page
    if (route.path === 'create-transaction/debit') {
      return <CreateDebit />;
    }
    // If route.path is equal to Transactions
    if (route.path === 'transactions') {
      return <Transactions />;
    }
    // Else if there's an error, direct user to error page.
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
