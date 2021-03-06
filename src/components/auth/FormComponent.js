import React, {Component} from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

// Form imports
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import Validations from '../../common/forms';

import '../../styles/Login.css';
import logo from '../../assets/logo-coloured.png';

const Validation = Validations.Auth;

// Login Form Component
export class FormComponent extends Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit = (e) => {
    e.preventDefault();
    let values = this.form.getValues();
    this.props.submit(values.email, values.password);
  };

  render() {
    const password = (this.props.registration ? (
      <div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            name="password"
            className="form-control"
            validations={[Validation.required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm your password</label>
          <Input
            type="password"
            name="passwordConfirmation"
            className="form-control"
            validations={[Validation.required, Validation.passwordConfirmation]}
          />
        </div>
      </div>
    ) : (
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          className="form-control"
          validations={[Validation.required]}
        />
      </div>
    ));

    const buttons = (this.props.registration ? (
      <div className="clearfix">

        <NavLink
          exact to='/login'
          className="btn btn-default col-md-5 btn-left"
        >
          <i className="fa fa-sign-in" />
          &nbsp;
          Sign in
        </NavLink>

        <Button
          className="btn btn-primary col-md-5 btn-right"
          type="submit"
        >
          {(this.props.registrationStatus && !Object.keys(this.props.registrationStatus).length ? (
            (<Spinner className="spinner" name='circle' color='white'/>)
          ) : (
            <div>
              <i className="fa fa-user-plus" />
              &nbsp;
              Sign up
            </div>
          ))}
        </Button>

      </div>
    ) : (
      <div className="clearfix">

        <NavLink
          exact to='/register'
          className="btn btn-default col-md-5 btn-left"
        >
          <i className="fa fa-user-plus" />
          &nbsp;
          Sign up
        </NavLink>

        <Button
          className="btn btn-primary col-md-5 btn-right"
          type="submit"
        >
          {(this.props.loginStatus && !Object.keys(this.props.loginStatus).length ? (
            (<Spinner className="spinner" name='circle' color='white'/>)
          ) : (
            <div>
              <i className="fa fa-sign-in" />
              &nbsp;
              Sign in
            </div>
          ))}
        </Button>

      </div>
    ));

    let error;
    if (!this.props.registration) {
      error = (this.props.loginStatus && this.props.loginStatus.hasOwnProperty("error") ? (
        <div className="alert alert-warning">{this.props.loginStatus.error}</div>
      ): "");
    } else {
      error = (this.props.registrationStatus && this.props.registrationStatus.hasOwnProperty("error") ? (
        <div className="alert alert-warning">{this.props.registrationStatus.error}</div>
      ): "");
    }

    return (
      <div className="login">
        <div className="row">
          <div
            className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 parent"
          >
            <div className="white-box vertCentered">

              <img src={logo} id="logo" alt="TrackIt logo" />

              <hr />

              {error}

              <Form
                ref={
                  /* istanbul ignore next */
                  (form) => {this.form = form;}
                }
                onSubmit={this.submit}>

                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <Input
                    name="email"
                    type="email"
                    className="form-control"
                    validations={[Validation.required, Validation.email]}
                  />
                </div>

                {password}

                {buttons}

              </Form>

            </div>

          </div>

        </div>
      </div>
    );
  }

}

FormComponent.propTypes = {
  submit: PropTypes.func.isRequired,
  registration: PropTypes.bool,
  loginStatus: PropTypes.shape({
    status: PropTypes.bool,
    error: PropTypes.string
  }),
  registrationStatus: PropTypes.shape({
    status: PropTypes.bool,
    error: PropTypes.string
  })
};

FormComponent.defaultProps = {
  registration: false
};

export default withRouter(FormComponent);
