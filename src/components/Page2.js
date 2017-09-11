import React from 'react';
import Header from "./Header";
import Menu from "./Menu";

export default class Page2 extends React.Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Menu/>
        <div className="App-content">
          Page2 content visible for moderator or admin only!
        </div>
      </div>
    );
  }
}