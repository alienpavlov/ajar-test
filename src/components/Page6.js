import React from 'react';
import Header from "./Header";
import Menu from "./Menu";

export default class Page6 extends React.Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Menu/>
        <div className="App-content">
          Page6 content visible for everyone
        </div>
      </div>
    );
  }
}