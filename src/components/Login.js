import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink} from 'react-router-dom';
import auth from './../fakeAuth';
import {Button, Form, Col, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {error: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    auth.login(email, password, (loggedIn) => {
      if (!loggedIn) {
        return this.setState({error: true});
      } else {
        window.location.href = "/";
      }
    });
  }

  render() {
    return (
      <div>
        <Form horizontal onSubmit={this.handleSubmit} className="login-form">
          <FormGroup controlId="formHorizontalEmail" validationState={this.state.error ? "error" : null}>
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" ref="email"/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword" validationState={this.state.error ? "error" : null}>
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" ref="password"/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Sign in
              </Button>
              &nbsp;or&nbsp;
              <NavLink to={'/signup'}>Sign Up</NavLink>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}