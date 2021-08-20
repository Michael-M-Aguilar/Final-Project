import React from 'react';
import Home from './pages/home';
import Header from './components/header';
import CreateTransaction from './pages/create-transaction';
import CreateCredit from './pages/create-credit';
import CreateDebit from './pages/create-debit';
import ParseRoute from '../server/parse-route';
import NotFound from './components/not-found';
import Transactions from './pages/transactions';
import Folder from './pages/folder';
import CreateCategory from './pages/create-category';
import SpendingChart from './pages/spending-chart';
import Footer from './components/footer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: ParseRoute(window.location.hash),
      error: false
    };
    this.errorMessage = this.errorMessage.bind(this);
  }

  // Hash Routing
  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: ParseRoute(window.location.hash) });
    });
    fetch('/api/chart')
      .then(res => res.json())
      .catch(error => {
        if (error.message === 'Failed to fetch') {
          this.setState({ error: true });
        }
      });
  }

  errorMessage() {
    return (
      <div className="wrapper">
        <p className="dm-text text-header fs-1"> Sorry there was an error with the network</p>
        <p className="dm-text text-header fs-1"> Please check your internet connection, and try again.</p>
      </div>
    );
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
    if (route.path === 'folder') {
      return <Folder />;
    }
    if (route.path === 'create-category') {
      return <CreateCategory />;
    }
    if (route.path === 'spending-chart') {
      return <SpendingChart />;
    }
    // Else if there's an error, direct user to error page.
    return <NotFound />;
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        this.errorMessage()
      );
    }
    return (
      <>
        <Header />
        {this.renderPage()}
        <Footer />
      </>
    );
  }
}
