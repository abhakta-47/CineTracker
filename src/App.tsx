// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import MovieDetailsPage from './pages/MovieDetailsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SearchPage} />
        <Route path="/search" exact component={SearchPage} />
        <Route path="/search/:key" component={SearchPage} />
        <Route path="/item/:id" component={MovieDetailsPage} />
      </Switch>
    </Router>
  );
};

export default App;