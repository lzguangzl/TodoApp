import React, { Component } from "react";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TodoDataService from "../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";

class TodoComponent extends Component {
  state = {
    id: this.props.match.params.id,
    description: "",
    targetDate: moment(new Date()).format("YYYY-MM-DD"),
  };

  componentDidMount() {
    if (this.state.id === -1) {
      return;
    }

    let username = AuthenticationService.getLoggedInUserName();
    TodoDataService.retrieveTodo(username, this.state.id).then((res) =>
      this.setState({
        description: res.data.description,
        targetDate: moment(res.data.targetDate).format("YYYY-MM-DD"),
      })
    );
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (values) => {
    let username = AuthenticationService.getLoggedInUserName();
    let todo = {
      id: this.state.id,
      description: values.description,
      targetDate: values.targetDate,
    };
    if (this.state.id === -1) {
      TodoDataService.createTodo(username, todo).then(() =>
        this.props.history.push("/todos")
      );
    } else {
      TodoDataService.updateTodo(username, this.state.id, todo).then(() =>
        this.props.history.push("/todos")
      );
    }
  };

  validate = (values) => {
    let errors = {};
    if (!values.description) {
      errors.description = "Enter a Description";
    } else if (values.description.length < 5) {
      errors.description = "Enter at least 5 Characters in Description";
    }

    if (!moment(values.targetDate).isValid()) {
      errors.targetDate = "Enter a Valid Target Date";
    }

    return errors;
  };

  render() {
    let { description, targetDate } = this.state;
    return (
      <div>
        <h1>Todo</h1>
        <div className='container'>
          <Formik
            initialValues={{ description, targetDate }}
            onSubmit={this.onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name='description'
                  component='div'
                  className='alert alert-warning'
                />
                <ErrorMessage
                  name='targetDate'
                  component='div'
                  className='alert alert-warning'
                />
                <fieldset className='form-group'>
                  <label htmlFor='description'>Description</label>
                  <Field
                    className='form-control'
                    type='text'
                    name='description'
                    value={this.state.description || ""}
                    onChange={this.onChange}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <label htmlFor='targetDate'>Target Date</label>
                  <Field
                    className='form-control'
                    type='date'
                    name='targetDate'
                    value={this.state.targetDate || ""}
                    onChange={this.onChange}
                  />
                </fieldset>
                <button className='btn btn-success' type='submit'>
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
export default TodoComponent;
