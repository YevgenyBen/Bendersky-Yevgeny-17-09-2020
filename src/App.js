import React from 'react';
import './App.css';
import Header from './components/Header'

import FavoritesPage from './pages/FavoritesPage'
import HomePage from './pages/HomePage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, BrowserRouter
} from "react-router-dom";

function App() {
  return (
    <>
      
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/favorites">
            <FavoritesPage />
          </Route>
        </Switch>
      </Router>
    </>);
}

export default App;
