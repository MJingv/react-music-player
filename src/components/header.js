import React, { Component } from 'react';
import './header.css'
import logo from '../images/logo.png';

class Header extends Component {
  render() {
    return (
      <div className = "component-header ">
        <img src = {logo} width = "40" height="40" alt = "logo" ></img>
        <h1 className = "caption">React Music Player</h1>
      </div>
    );
  }
}

export default Header;
