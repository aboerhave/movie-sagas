import React, { Component } from 'react';
import { HashRouter as Route, Router, Link} from 'react-router-dom'; 
import './Header.css';


class Header extends Component {

  render() {
    return (
        <header className="App-header">
            <h1 className="App-title">Awesome Movies!</h1>
            <ul className="navBar">
                <li className="navLink"><Link to='/'>Home</Link></li>
                <li className="navLink"><Link to='/AddMovie'>Add Movie</Link></li>
            </ul>
        </header>
    );
  }
}

export default Header;
