import React, { Component } from "react";
import TodoDataService from "../../component/api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";
import moment from "moment";

class ListTodosComponent extends Component {
  state = {
    todos: [],
    message: null,
  };

  componentDidMount() {
    this.refreshTodos();
  }

  refreshTodos = () => {
    let username = AuthenticationService.getLoggedInUserName();
    TodoDataService.retrieveAllTodos(username).then((res) => {
      console.log(res);
      this.setState({
        todos: res.data,
      });
    });
  };

  updateTodo = (id) => {
    console.log("updateTodo" + id);
    this.props.history.push(`/todos/${id}`);
  };

  addTodo = () => {
    console.log("createTodo");
    this.props.history.push(`/todos/-1`);
  };

  deleteTodo = (id) => {
    let username = AuthenticationService.getLoggedInUserName();
    console.log(id + " : " + username);
    TodoDataService.deleteTodo(username, id).then(
      (res) => this.setState({ message: `Delete of todo ${id} successful` }),
      this.refreshTodos()
    );
  };

  render() {
    return (
      <div className='container-fluid'>
        <h1>List Todos</h1>
        {this.state.message && (
          <div className='alert alert-success'>{this.state.message}</div>
        )}
        <div className='container'>
          <table className='table table-bordered table-hover table-striped'>
            <thead className='thead-dark'>
              <tr>
                <th>Description</th>
                <th>Target Date</th>
                <th>IsCompleted?</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.description}</td>
                  <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                  <td>{todo.done.toString()}</td>
                  <td>
                    <button
                      className='btn btn-success'
                      onClick={() => this.updateTodo(todo.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn btn-warning'
                      onClick={() => this.deleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='btn btn-success btn-block' onClick={this.addTodo}>
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default ListTodosComponent;
