import * as React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Heroes from './Heroes';
import Dashboard from './Dashboard';
import HeroDetail from './HeroDetail';

function AppRouter() {
  return (
    <Router>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/heroes">Heroes</Link>
      </nav>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/heroes" component={Heroes} />
      <Route path="/detail/:id" component={HeroDetail} />
      <Redirect from="/" exact strict to="/dashboard" />
    </Router>
  );
}

export default AppRouter;
