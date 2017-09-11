import React from 'react';
import Header from "./Header";
import Menu from "./Menu";

export default class Page8 extends React.Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Menu/>
        <div className="App-content">
          Page8 content visible for everyone
        </div>
      </div>
    );
  }
}