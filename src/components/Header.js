import React from 'react';
import logo from './../images/logo.svg';
import auth from './../fakeAuth';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

export default class Header extends React.Component {
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h2>Some header</h2>
        <h3>Hello, {auth.getUsername()}</h3>
        <Link to={'/logout'}><Button>Log Out</Button></Link>
      </header>
    );
  }
}