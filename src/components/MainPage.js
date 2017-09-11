import React from 'react';
import {Button} from 'react-bootstrap';
import auth from '../fakeAuth';
import Header from "./Header";
import Menu from "./Menu";

export default class MainPage extends React.Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Menu/>
        <div className="App-content">
          <p>Text visible for everyone</p>

          {auth.isModerator() ? (
            <p>Text visible only for moderator and admin</p>
          ) : null}

          {auth.isAdmin() ? (
            <p>Text visible only for admin and a secret <Button>button</Button></p>
          ) : null}
        </div>
      </div>
    );
  }
}