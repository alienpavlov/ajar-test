import React from 'react';
import Header from "./Header";
import Menu from "./Menu";

export default class Page7 extends React.Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Menu/>
        <div className="App-content">
          Page7 content visible for admin only!
        </div>
      </div>
    );
  }
}