import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthenitcatedRoute from "./AuthenitcatedRoute";
import LoginComponent from "./LoginComponent";
import ListTodosComponent from "./ListTodosComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import WelcomeCompoonent from "./WelcomeComponent";
import LogoutComponent from "./LogoutComponent";
import ErrorComponent from "./ErrorComponent";
import TodoComponent from "./TodoComponent";

class TodoApp extends Component {
  render() {
    return (
      <div className='TodoApp'>
        <Router>
          <HeaderComponent />
          <Switch>
            <Route exact path='/' component={LoginComponent} />
            <Route path='/login' component={LoginComponent} />
            <AuthenitcatedRoute
              path='/welcome/:name'
              component={WelcomeCompoonent}
            />
            <AuthenitcatedRoute path='/todos/:id' component={TodoComponent} />
            <AuthenitcatedRoute path='/todos' component={ListTodosComponent} />
            <AuthenitcatedRoute path='/logout' component={LogoutComponent} />
            <Route component={ErrorComponent} />
          </Switch>
          <FooterComponent />
        </Router>
      </div>
    );
  }
}

export default TodoApp;
