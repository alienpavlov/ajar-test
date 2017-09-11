import React from 'react';
import _ from 'lodash';
import {Button, Form, Col, Checkbox, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export default class Signup extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      signupData: {
        "firstname": '',
        "lastname": '',
        "email": '',
        "usertype": 1,
        "country": 'ru',
        "bio": '',
        "password": '',
        "confirmpassword": '',
        "privacy": false,
        "newsletters": true
      },
      currentStep: 1
    };
  }

  gotoStep(step) {
    //validate before go
    if (this.state.currentStep > step || this.isValid()) {
      this.setState({currentStep: step});
      if (window.localStorage) {
        window.localStorage.setItem("signupData", JSON.stringify(this.state));
      }
    }
  }

  isValid() {
    switch (this.state.currentStep) {
      case 1:
        if (!this.state.signupData.firstname || !this.state.signupData.lastname || !this.state.signupData.email) {
          return false;
        }
        break;

      case 2:
        if (!this.state.signupData.usertype || !this.state.signupData.country || !this.state.signupData.bio) {
          return false;
        }
        break;

      case 3:
        if (!this.state.signupData.password || this.state.signupData.password !== this.state.signupData.confirmpassword || !this.state.signupData.privacy) {
          return false;
        }
        break;

      default:
        return true;
    }
    return true;
  }

  onInputChange(event) {
    const {target} = event;
    const {name} = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const state = Object.assign({}, this.state);
    _.set(state, name, value);
    this.setState(state);

    if (window.localStorage) {
      window.localStorage.setItem("signupData", JSON.stringify(this.state));
    }

  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.isValid()) {
      alert("Registration is successful!");
      console.info(this.state);

      //reset
      this.setState({
        signupData: {
          "firstname": '',
          "lastname": '',
          "email": '',
          "usertype": 1,
          "country": 'ru',
          "bio": '',
          "password": '',
          "confirmpassword": '',
          "privacy": false,
          "newsletters": true
        },
        currentStep: 1
      });
    }
  }

  componentWillMount() {
    const signupData = window.localStorage.getItem("signupData");
    if (window.localStorage && signupData) {
      this.setState(JSON.parse(signupData));
    }
  }

  render() {
    return (
      <div className="signup-form">
        <Form horizontal onSubmit={this.handleSubmit}>
          <div id="step1" className={this.state.currentStep !== 1 ? "hidden" : ""}>
            <h3>Step 1</h3>
            <hr/>
            <FormGroup validationState={!this.state.signupData.firstname ? "error" : null}>
              <Col componentClass={ControlLabel} sm={3}>
                First name
              </Col>
              <Col sm={9}>
                <FormControl type="text" placeholder="First name" name="signupData.firstname"
                             value={this.state.signupData.firstname}
                             onChange={this.onInputChange.bind(this)}/>
              </Col>
            </FormGroup>

            <FormGroup validationState={!this.state.signupData.lastname ? "error" : null}>
              <Col componentClass={ControlLabel} sm={3}>
                Last name
              </Col>
              <Col sm={9}>
                <FormControl required type="text" placeholder="Last name" name="signupData.lastname"
                             value={this.state.signupData.lastname}
                             onChange={this.onInputChange.bind(this)}/>
              </Col>
            </FormGroup>

            <FormGroup validationState={!this.state.signupData.email ? "error" : null}>
              <Col componentClass={ControlLabel} sm={3}>
                Email
              </Col>
              <Col sm={9}>
                <FormControl type="email" placeholder="Email" name="signupData.email"
                             value={this.state.signupData.email}
                             onChange={this.onInputChange.bind(this)}/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={3} sm={9}>
                <Button className="right-btn" type="button" onClick={this.gotoStep.bind(this, 2)}>
                  Next
                </Button>
              </Col>
            </FormGroup>
          </div>

          <div id="step2" className={this.state.currentStep !== 2 ? "hidden" : ""}>
            <h3>Step 2</h3>
            <hr/>
            <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={3}>
                User type
              </Col>
              <Col sm={9}>
                <FormControl componentClass="select" placeholder="select"
                             name="signupData.usertype"
                             value={this.state.signupData.usertype}
                             onChange={this.onInputChange.bind(this)}>
                  {/*@TODO: get const*/}
                  <option value={1}>User</option>
                  <option value={2}>Admin</option>
                  <option value={3}>Moderator</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={3}>
                Country
              </Col>
              <Col sm={9}>
                <FormControl componentClass="select" placeholder="select"
                             name="signupData.country"
                             value={this.state.signupData.country}
                             onChange={this.onInputChange.bind(this)}>
                  <option value="ru">Russia</option>
                  <option value="uae">United Arab Emirates</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea" validationState={!this.state.signupData.bio ? "error" : null}>
              <Col componentClass={ControlLabel} sm={3}>Bio</Col>
              <Col sm={9}>
                <FormControl componentClass="textarea" placeholder="Tell about yourself"
                             name="signupData.bio"
                             value={this.state.signupData.bio}
                             onChange={this.onInputChange.bind(this)}/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={3} sm={9}>
                <Button type="button" onClick={this.gotoStep.bind(this, 1)}>
                  Prev
                </Button>
                <Button className="right-btn" type="button" onClick={this.gotoStep.bind(this, 3)}>
                  Next
                </Button>
              </Col>
            </FormGroup>
          </div>

          <div id="step3" className={this.state.currentStep !== 3 ? "hidden" : ""}>
            <h3>Step 3</h3>
            <hr/>
            <FormGroup controlId="formHorizontalPassword"
                       validationState={!this.state.signupData.password || this.state.signupData.password !== this.state.signupData.confirmpassword ? "error" : null}>
              <Col componentClass={ControlLabel} sm={3}>
                Password
              </Col>
              <Col sm={9}>
                <FormControl type="password" placeholder="Password" name="signupData.password"
                             onChange={this.onInputChange.bind(this)}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalConfirmPassword"
                       validationState={!this.state.signupData.password || this.state.signupData.password !== this.state.signupData.confirmpassword ? "error" : null}>
              <Col componentClass={ControlLabel} sm={3}>
                Confirm Password
              </Col>
              <Col sm={9}>
                <FormControl type="password" placeholder="Confirm Password" name="signupData.confirmpassword"
                             onChange={this.onInputChange.bind(this)}/>
              </Col>
            </FormGroup>

            <FormGroup validationState={!this.state.signupData.privacy ? "error" : null}>
              <Col smOffset={3} sm={9}>
                <Checkbox name="signupData.privacy"
                          checked={this.state.signupData.privacy}
                          onChange={this.onInputChange.bind(this)}>
                  I have read and agree to the Privacy Policy
                </Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={3} sm={9}>
                <Checkbox name="signupData.newsletters"
                          checked={this.state.signupData.newsletters}
                          onChange={this.onInputChange.bind(this)}>
                  Subscribe to the newsletters
                </Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={3} sm={9}>
                <Button type="button" onClick={this.gotoStep.bind(this, 2)}>
                  Prev
                </Button>
                <Button className="right-btn" type="submit">
                  Submit
                </Button>
              </Col>
            </FormGroup>
          </div>
        </Form>
      </div>
    );
  }
}