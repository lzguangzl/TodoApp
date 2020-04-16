import React, { Component } from "react";
import "./App.css";
//import Counter from "./component/counter/Counter";
import TodoApp from "./component/todo/TodoApp";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className='App'>
        {/* <Counter /> */}
        <TodoApp />
      </div>
    );
  }
}

export default App;
