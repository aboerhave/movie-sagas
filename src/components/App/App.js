import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';
import Details from '../Details/Details';
import AddMovie from '../AddMovie/AddMovie';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
        <Router>
          <div className="App">
          <h1>Movies!</h1>
          {/* Only the Home component displays at exact path /
          The rest are the paths for later */}
          <Route exact path='/' component={Home} />
          <Route path='/Details' component={Details} />
          <Route path='/AddMovie' component={AddMovie} />
      </div>
        </Router>
    );
  }
}

export default App;
