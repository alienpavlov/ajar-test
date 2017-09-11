import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import MainPage from './MainPage';
import Auth from './../fakeAuth';

import Login from './Login';
import Signup from './Signup';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import Page6 from './Page6';
import Page7 from './Page7';
import Page8 from './Page8';
import Page9 from './Page9';

class Root extends React.Component {
  logout() {
    Auth.logout();
    return (<Redirect to="/login"/>);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/logout" render={() => this.logout()}/>
          <Route exact path="/" render={() => (<Redirect to="/main"/>)}/>

          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup}/>

            {/* for logged in users only */}
            <Route render={() => !Auth.loggedIn() ? <Redirect to="/login"/> : (
              <div>
                <Route exact path="/main" component={MainPage}/>
                <Route exact path="/page1" component={Page1}/>
                <Route exact path="/page3" component={Page3}/>
                <Route exact path="/page4" component={Page4}/>
                <Route exact path="/page6" component={Page6}/>
                <Route exact path="/page8" component={Page8}/>
                <Route exact path="/page9" component={Page9}/>

                {/* for Moderators only */}
                <Route render={() => !Auth.isModerator() ? <Redirect to="/main"/> : (
                  <Route exact path="/page2" component={Page2}/>
                )}/>

                {/* for Admins only */}
                <Route render={() => !Auth.isAdmin() ? <Redirect to="/main"/> : (
                  <div>
                    <Route exact path="/page5" component={Page5}/>
                    <Route exact path="/page7" component={Page7}/>
                  </div>
                )}/>
              </div>
            )}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Root;