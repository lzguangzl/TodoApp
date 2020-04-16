import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";

class LoginComponent extends Component {
  state = {
    username: "zguang",
    password: "zguang",
    isLoginSuccess: false,
    isLoginFail: false,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLogin = (e) => {
    e.preventDefault();

    AuthenticationService.executeJwtAuthenticationService(
      this.state.username,
      this.state.password
    )
      .then((res) => {
        AuthenticationService.registerSuccessfulLoginForJwt(
          this.state.username,
          res.data.token
        );
        this.props.history.push(`/welcome/${this.state.username}`);
      })
      .catch(() => {
        this.setState({
          isLoginSuccess: false,
          isLoginFail: true,
        });
      });

    /* Basic Auth */
    // AuthenticationService.executeBasicAuthenticationService(
    //   this.state.username,
    //   this.state.password
    // )
    //   .then(() => {
    //     AuthenticationService.registerSuccessfulLogin(
    //       this.state.username,
    //       this.state.password
    //     );
    //     this.props.history.push(`/welcome/${this.state.username}`);
    //   })
    //   .catch(() => {
    //     this.setState({
    //       isLoginSuccess: false,
    //       isLoginFail: true,
    //     });
    //   });
  };

  render() {
    return (
      <React.Fragment>
        <div className='container-fluid'>
          <h1>Login</h1>
          {this.state.isLoginSuccess && (
            <div className='alert alert-success'>Login Successful</div>
          )}
          {this.state.isLoginFail && (
            <div className='alert alert-warning'>Invalid Credentials</div>
          )}
          <form>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='username'>User Name</label>
                  <input
                    type='text'
                    className='form-control'
                    name='username'
                    id='username'
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input
                    type='password'
                    className='form-control'
                    name='password'
                    id='password'
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <button className='btn btn-success' onClick={this.onLogin}>
              Login
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginComponent;
